import { useState, useEffect, useRef } from 'react';

const VIDEO_1_COUNT = 240;
const VIDEO_2_COUNT = 192;

export function useFramePreloader() {
  const [video1Images, setVideo1Images] = useState([]);
  const [video2Images, setVideo2Images] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const imagesRef1 = useRef([]);
  const imagesRef2 = useRef([]);

  useEffect(() => {
    let isCancelled = false;

    const pad = (num) => String(num).padStart(4, '0');

    imagesRef1.current = new Array(VIDEO_1_COUNT).fill(null);
    imagesRef2.current = new Array(VIDEO_2_COUNT).fill(null);

    let totalLoaded = 0;
    const totalFrames = VIDEO_1_COUNT + VIDEO_2_COUNT;

    // Asynchronous hardware-accelerated image loader
    const loadImage = async (src) => {
      const img = new Image();
      img.src = src;
      try {
        if ('decode' in img) {
          await img.decode();
          return img;
        }
      } catch (e) {
        // Fallback to standard onload if decode() fails
      }
      return new Promise((resolve) => {
        img.onload = () => resolve(img);
        img.onerror = () => {
          console.warn('Failed to load frame:', src);
          resolve(null);
        };
      });
    };

    const loadAll = async () => {
      // Step 1: Load initial master frames immediately for instant crystal-clear render
      const [img1, img2] = await Promise.all([
        loadImage(`/frames/video1/frame-0001.jpg`),
        loadImage(`/frames/video2/frame-0001.jpg`)
      ]);
      if (isCancelled) return;

      imagesRef1.current[0] = img1;
      imagesRef2.current[0] = img2;
      totalLoaded += 2;

      setVideo1Images([...imagesRef1.current]);
      setVideo2Images([...imagesRef2.current]);
      setLoadingProgress(Math.round((totalLoaded / totalFrames) * 100));
      setIsReady(true);

      // Step 2: Load evenly distributed keyframes
      const step = 4;
      const keyframePromises = [];

      for (let i = 0; i < VIDEO_1_COUNT; i += step) {
        if (i === 0) continue;
        const p = loadImage(`/frames/video1/frame-${pad(i + 1)}.jpg`).then((img) => {
          imagesRef1.current[i] = img;
          totalLoaded++;
          if (totalLoaded % 10 === 0) {
            setLoadingProgress(Math.round((totalLoaded / totalFrames) * 100));
          }
        });
        keyframePromises.push(p);
      }

      for (let i = 0; i < VIDEO_2_COUNT; i += step) {
        if (i === 0) continue;
        const p = loadImage(`/frames/video2/frame-${pad(i + 1)}.jpg`).then((img) => {
          imagesRef2.current[i] = img;
          totalLoaded++;
          if (totalLoaded % 10 === 0) {
            setLoadingProgress(Math.round((totalLoaded / totalFrames) * 100));
          }
        });
        keyframePromises.push(p);
      }

      await Promise.all(keyframePromises);
      if (isCancelled) return;

      setVideo1Images([...imagesRef1.current]);
      setVideo2Images([...imagesRef2.current]);

      // Step 3: Stream all remaining frames in clean concurrent batches
      const remainingIndices1 = [];
      for (let i = 0; i < VIDEO_1_COUNT; i++) {
        if (!imagesRef1.current[i]) remainingIndices1.push(i);
      }

      const remainingIndices2 = [];
      for (let i = 0; i < VIDEO_2_COUNT; i++) {
        if (!imagesRef2.current[i]) remainingIndices2.push(i);
      }

      const loadBatch = async (indices, isVideo1) => {
        const BATCH_SIZE = 16;
        for (let b = 0; b < indices.length; b += BATCH_SIZE) {
          if (isCancelled) return;
          const chunk = indices.slice(b, b + BATCH_SIZE);
          await Promise.all(
            chunk.map(async (idx) => {
              const folder = isVideo1 ? 'video1' : 'video2';
              const img = await loadImage(`/frames/${folder}/frame-${pad(idx + 1)}.jpg`);
              if (isVideo1) {
                imagesRef1.current[idx] = img;
              } else {
                imagesRef2.current[idx] = img;
              }
              totalLoaded++;
            })
          );
          setLoadingProgress(Math.round((totalLoaded / totalFrames) * 100));
        }
      };

      await loadBatch(remainingIndices1, true);
      await loadBatch(remainingIndices2, false);

      if (!isCancelled) {
        setVideo1Images([...imagesRef1.current]);
        setVideo2Images([...imagesRef2.current]);
        setLoadingProgress(100);
      }
    };

    loadAll();

    return () => {
      isCancelled = true;
    };
  }, []);

  return { video1Images: imagesRef1.current, video2Images: imagesRef2.current, loadingProgress, isReady };
}
