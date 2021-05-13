const imageMimeTypes = ['image/jpeg', 'image/gif', 'image/png'];

export const saveImageAsBinary = (data: any, imgEncoded: string) => {
  if (imgEncoded === null) return;

  const img = JSON.parse(imgEncoded);

  if (img !== null && imageMimeTypes.includes(img.type)) {
    // save to db
    data.photo = Buffer.from(img.data).toString('base64');
    console.log('photo', typeof data.photo, data.photo);
    data.photoType = img.type;
  }
  return data;
};
