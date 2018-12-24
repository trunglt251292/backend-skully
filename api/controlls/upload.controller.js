import multer from 'multer';
import path from 'path';
import * as Skullies_Services from '../services/skullies.service';

const destAvatar = path.resolve(__dirname, '../../public/skully');
const storageAvatar = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, destAvatar);
  },
  filename: function (req, file, cb) {
    let ext = '';
    switch (file.mimetype) {
      case 'image/jpeg':
        ext = '.jpeg';
        break;
      case 'image/png':
        ext = '.png';
        break;
      case 'image/gif':
        ext = '.gif';
        break;
    }
    cb(null, Skullies_Services.setId() + ext);
  }
});
const uploadAvatar = multer({storage: storageAvatar});
export const multipleUploadAvatar = uploadAvatar.single('avatar');
