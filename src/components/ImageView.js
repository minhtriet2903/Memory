import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

const ImageView = props => {
  const { placeholderImage, source, children, height, width, text } = props;

  const [isError, setError] = useState(false);
  const [imageWidth, setImageWidth] = useState(props.width || 0);
  const [imageHeight, setImageHeight] = useState(props.height || 0);

  const onError = () => {
    setError(true);
  };

  let imageSrc = source;
  if (isError) {
    imageSrc = placeholderImage;
  }

  const onLoad = e => {
    const { width: sourceWidth, height: sourceHeight } = e.nativeEvent;

    if (width && !height) {
      setImageWidth(width);
      setImageHeight(sourceHeight * (width / sourceWidth));
    } else if (!width && height) {
      setImageWidth(sourceWidth * (height / sourceHeight));
      setImageHeight(height);
    } else {
      setImageHeight(sourceHeight);
      setImageWidth(sourceWidth);
    }
  };

  return (
    <FastImage
      {...props}
      onError={onError}
      source={imageSrc}
      onLoad={onLoad}
      style={[{ width: imageWidth, height: imageHeight }, props.style]}>
      {children}
    </FastImage>
  );
};

ImageView.resizeMode = {
  ...FastImage.resizeMode,
};

ImageView.priority = {
  ...FastImage.priority,
};

ImageView.preload = sources => {
  FastImage.preload(sources);
};

ImageView.propTypes = {
  ...FastImage.propTypes,
  placeholderImage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  text: PropTypes.string,
};

ImageView.defaultProps = {
  children: null,
  text: '',
};

export default ImageView;
