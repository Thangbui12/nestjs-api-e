import { extname } from 'path';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0].replace(/\s/g, '');
  const fileExtName = extname(file.originalname);
  const nameByDate = Date.now().toString();

  callback(null, `${name}-${nameByDate}${fileExtName}`);
};