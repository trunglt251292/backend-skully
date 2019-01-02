import serverConfig from '../config';
import {User} from '../models';

let language = 'en';
export async function sendMail(data) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(serverConfig.sendgridApiKey);
  language = data.language;
  let mailOptions = await getMailOptions(data);
  const msg = {
    to: mailOptions.to,
    from: mailOptions.from,
    subject: mailOptions.subject,
    html: mailOptions.html,
  };
  // console.log("Send mail :",msg);
  sgMail.send(msg);
}


async function getMailOptions(data) {
  try{
    let user = await User.findOne({
      where:{email:data.data.email},
      raw:true
    });
    if(user){
      switch(data.type) {
        case 'forgotPassword':
          return getOptsMailForgotPassword(data.data);
        case 'activeAccount':
          return getOptsMailActiveAccount(data.data);
        default:
          break;
      }
    }else{
      switch(data.type) {
        case 'activeAccount':
          return getOptsMailActiveAccount(data.data);
        default:
          break;
      }
    }
  }catch(err){
    console.log('err getMailOptions: ',err);
    throw err;
  }
}


function getOptsMailForgotPassword(data) {
  if(language == 'vi'){
    return {
      from: serverConfig.fromMail,
      to: data.email,
      subject: 'N3 - Đặt lại mật khẩu',
      html: '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/1999/REC-html401-19991224/strict.dtd"> <html><head><title>Đặt lại mật khẩu</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body><p>Ai đó (hy vọng bạn) đã yêu cầu một mật khẩu mới cho tài khoản N3 ' + data.email + '. Chưa có thay đổi nào trên tài khoản của bạn.</p><p>Bạn có thể đặt lại mật khẩu bằng cách nhấp vào liên kết bên dưới: </p><a href="' + serverConfig.clientHttpsHost + '/reset?token=' + data.token + '"> Đặt lại mật khẩu </a><br><p>N3</p><p>Nếu bạn không yêu cầu một mật khẩu mới, vui lòng cho chúng tôi biết ngay bằng cách trả lời email này.</p></body></html>'
    };
  } else {
    return {
      from: serverConfig.fromMail,
      to: data.email,
      subject: 'N3 - Forgot password reset',
      html: '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/1999/REC-html401-19991224/strict.dtd"> <html><head><title>Forgot password reset</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body><p>Somebody (hopefully you) requested a new password for the N3 account for ' + data.email + '. No changes have been made to your account yet.</p><p>You can reset your password by clicking the link below: </p><a href="' + serverConfig.clientHttpsHost + '/reset?token=' + data.token + '"> Reset password </a><br><p>The N3</p><p>If you did not request a new password, please let us know immediately by replying to this email.</p></body></html>'
    };
  }
}


function getOptsMailActiveAccount(data) {
  if(language == 'vi'){
    return {
      from: serverConfig.fromMail,
      to: data.email,
      subject: 'N3 - kích hoạt tài khoản',
      html: '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/1999/REC-html401-19991224/strict.dtd"> <html><head><title>Xác nhận tại khoản N3</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body><p>Xin chào ' + data.username +',</p><p>Chào mừng đến với N3,</p><p>Vui lòng xác nhận tài khoản của bạn bằng cách click vào "Xác nhận tài khoản". </p><a href="' + serverConfig.host + '/active-account?email=' + data.email + '"> “Xác nhận tài khoản” </a><p>Hoặc copy liên kết bên dưới vào trình duyệt của bạn và nhấn "Enter":</p><p>' + serverConfig.host + '/active-account?email=' + data.email + '</p><br><p>N3.</p><br><p>Email này không thể nhận phản hồi. Để biết thêm thông tin, vui lòng liên hệ “support@N3.io”</p></body></html>'
    };
  } else {
    return {
      from: serverConfig.fromMail,
      to: data.email,
      subject: 'N3 - Active Account',
      html: '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/1999/REC-html401-19991224/strict.dtd"> <html><head><title>Confirm your N3 account</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8"></head><body><p>Hello ' + data.username +',</p><p>Welcome to N3!</p><p>Please confirm your account by clicking "Confirm account". </p><a href="' + serverConfig.host + '/active-account?email=' + data.email + '"> “Confirm account” </a><p>Or copy the link below into your browser and press "Enter":</p><p>' + serverConfig.host + '/active-account?email=' + data.email + '</p><br><p>N3 Team.</p><br><p>This email can\'t receive replies. For more information, please contact “support@N3.io”</p></body></html>'
    };
  }
}