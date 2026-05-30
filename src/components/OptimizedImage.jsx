import React, { useMemo, useState } from 'react';
import { getCloudinarySrcSet, getOptimizedImageUrl, isCloudinaryImage } from '../utils/imageUtils';

const OptimizedImage = ({
  src,
  alt,
  className,
  style,
  width,
  height,
  sizes = '100vw',
  mode = 'limit',
  quality = 'auto',
  eager = false,
  placeholderBlur = true,
  onLoad,
  onClick,
}) => {
  const [loaded, setLoaded] = useState(false);

  const optimizationOptions = useMemo(
    () => ({ width, height, mode, quality }),
    [width, height, mode, quality]
  );

  const finalSrc = useMemo(() => {
    if (!src) return src;
    return getOptimizedImageUrl(src, optimizationOptions);
  }, [src, optimizationOptions]);

  const srcSet = useMemo(() => {
    if (!src || !isCloudinaryImage(src)) return undefined;
    return getCloudinarySrcSet(src, optimizationOptions);
  }, [src, optimizationOptions]);

  const mergedStyle = placeholderBlur
    ? {
        ...style,
        filter: loaded ? 'none' : 'blur(8px)',
        opacity: loaded ? 1 : 0.9,
        transition: 'filter 220ms ease, opacity 220ms ease',
      }
    : style;

  return (
    <img
      src={finalSrc}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      className={className}
      style={mergedStyle}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding="async"
      onClick={onClick}
      onLoad={(event) => {
        setLoaded(true);
        if (onLoad) onLoad(event);
      }}
    />
  );
};

export default OptimizedImage;
