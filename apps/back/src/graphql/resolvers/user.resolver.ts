import mongoose, { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import UserSchema, { IUser } from '../../db/models/User';
import NotFoundError from '../../errors/NotFoundError';
import InputError from '../../errors/InputError';
import createToken from '../utils/token/createToken';
import usePasswordHashToMakeToken from '../utils/token/usePasswordHashToMakeToken';
import BadRequestError from '../../errors/BadRequestError';
import CreationError from '../../errors/CreationError';
import UnauthorizedError from '../../errors/UnhauthorizedError';
import { validateData } from '../utils/validateData';
import FoodSchema, { IFood } from '../../db/models/Food';
import { Icontext } from '../typeDef';
import { saveImageAsBinary } from '../utils/SaveImageAsBinary';
import { decode } from 'jsonwebtoken';
import { SECRET_KEY, apiKeyPrivate, apiKeyPublic } from '../../config.js';
import * as mailjet from 'node-mailjet';
const mailjetClient = mailjet.connect(apiKeyPublic, apiKeyPrivate);

type ID = Types.ObjectId;

interface ILoginUser {
  email: string;
  password: string;
}

interface UserWithToken {
  token: string;
  user: IUser;
}

interface sendString {
  message: string;
}

interface UserInput {
  userInput: IUser;
  _id: ID;
}

export default {
  Query: {
    async getUser(_: void, data: IUser, context: Icontext): Promise<IUser> {
      if (!context.user.id)
        throw new UnauthorizedError("Vous n'êtes pas connecté.");

      const userId = data._id;

      const errors: string[] = [];
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        errors.push('Missing ID input');
      }

      if (errors.length) {
        throw new InputError(errors);
      }

      const user = await UserSchema.findById(userId);
      if (!user) {
        throw new NotFoundError("Le looder n'existe pas");
      }

      return user;
    },
  },

  Mutation: {
    async createUser(_: void, data: UserInput): Promise<IUser> {
      // creation de l'utilisateur dans la bdd avec un statut en attente
      const { email } = data.userInput;

      const errors = validateData(data.userInput);
      const userWithSameEmail = await UserSchema.findOne({ email });

      if (userWithSameEmail) {
        throw new BadRequestError(`Un looder est déjà inscrit avec cet email`);
      }

      if (errors.length) {
        throw new InputError(errors);
      }

      const hashPassword = bcrypt.hashSync(data.userInput.password, 10);
      const userData = {
        email: data.userInput.email,
        password: hashPassword,
        lookFor: data.userInput.lookFor,
        pseudo: data.userInput.pseudo,
        birthdate: data.userInput.birthdate,
        sexe: data.userInput.sexe,
        status: 'pending',
        description: data.userInput.description,
      };

      saveImageAsBinary(userData, data.userInput.photo.toString());
      const user = new UserSchema(userData);

      if (user) {
        // création user
        user.save();

        // envoi mail
        try {
          // crée son token
          const token = createToken({
            payload: { email, password: hashPassword },
          });

          // url pour activer le compte
          const url = `http://localhost:4200/inscription/confirmation/${token}`;

          // création du mail d'activation
          const request = mailjetClient
            .post('send', { version: 'v3.1' })
            .request({
              Messages: [
                {
                  From: {
                    Email: 'mathilde.thoraninth@gmail.com',
                    Name: 'lood',
                  },
                  To: [
                    {
                      Email: email,
                    },
                  ],
                  Subject: 'Finalises ton inscription lood',
                  TextPart:
                    'Tu es à un clic de trouver ton âme soeur culinaire !',
                  HTMLPart: `<!doctype html><body><title></title>
                <!--[if !mso]><!-->
                <meta content="IE=edge" http-equiv="X-UA-Compatible" />
                <!--<![endif]-->
                <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                <meta content="width=device-width, initial-scale=1" name="viewport" />
                <style type="text/css">
                #outlook a { padding:0; }
                                        body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
                                        table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
                                        img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
                                        p { display:block;margin:16px 0; }</style>
                <!--[if mso]>
                                      <xml>
                                      <o:OfficeDocumentSettings>
                                        <o:AllowPNG/>
                                        <o:PixelsPerInch>96</o:PixelsPerInch>
                                      </o:OfficeDocumentSettings>
                                      </xml>
                                      <![endif]--><!--[if lte mso 11]>
                                      <style type="text/css">
                                        .mj-outlook-group-fix { width:100% !important; }
                                      </style>
                                      <![endif]--><!--[if !mso]><!-->
                <style type="text/css">
                @import url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap);</style>
                <!--<![endif]-->
                <style type="text/css">
                td.td-link--login {
                                    font-size:0px;padding:8px 24px;word-break:break-word;
                                    }
                                    @media only screen and (min-width:480px) {
                                      .mj-column-per-20 { width:20% !important; max-width: 20%; }
                              .mj-column-per-80 { width:80% !important; max-width: 80%; }
                              .mj-column-per-100 { width:100% !important; max-width: 100%; }
                                    }</style>
                <style type="text/css">
                @media only screen and (max-width:480px) {
                                    table.mj-full-width-mobile { width: 100% !important; }
                                    td.mj-full-width-mobile { width: auto !important; }
                                        td.td-link--login {
                                         padding-left:0;
                                        text-align:left;
                                        }
                                  }</style>
                <div style="background-color:#ffffff;border-top:4px solid #ed71a8;font-family: Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif">
                  <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:0;text-align:center;display: flex;align-items: center;">
                        <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:114.4px;" ><![endif]-->
                        <div class="mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                            <tbody>
                              <tr>
                                <td align="left" style="font-size:0px;padding:0px;word-break:break-word;">
                                  <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                    <tbody>
                                      <tr>
                                        <td style="width:114px;">
                                          <a href="http://localhost:4200" target="_blank"> 
<img src="https://x9g0m.mjt.lu/tplimg/x9g0m/b/sth4x/5vx0.png" alt="logo lood" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="100" /> </a></td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                       </td>
                    </tr>
                  </tbody>
                </table>
              </div>
                  <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                  <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                    <br />
                    &nbsp;</div>
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                    <tbody>
                      <tr>
                        <td>
                          <div style="margin:0px auto;max-width:600px;">
                            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                              <tbody>
                                <tr>
                                  <td style="direction:ltr;font-size:0px;padding:0px 16px;text-align:center;">
                                    <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                        <tbody>
                                          <tr>
                                            <td align="left" style="font-size:0px;padding:0;word-break:break-word;">
                                              <div style="font-family: Poppins,  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size:16px;line-height:24px;text-align:left;color:#525A65;">
                                                <span style="color:#2f52a0;"><span style="font-size:18px;"><strong>Bienvenue chez lood !</strong></span></span><br />
                                                <br />
                                                <span style="color: #2f52a0; font-family: Poppins, Tahoma, Geneva, sans-serif, sans-serif;font-weight:400">Afin de valider ton inscription, il te suffit de cliquer sur le bouton ci-dessous.</span></div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td align="left" style="font-size:0px;padding:24px 0;word-break:break-word;" vertical-align="middle">
                                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                                <tbody>
                                                  <tr>
                                                    <td align="center" bgcolor="#ed71a8" role="presentation" style="border:none;border-radius:4px;cursor:auto;mso-padding-alt:10px 25px;background:#ed71a8;" valign="middle">
                                                      <a href="${url}" style="display:inline-block;background:#ed71a8;color:#ffffff;font-family: Poppins,  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;font-size:13px;font-weight:500;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:16px 24px;mso-padding-alt:0px;border-radius:8px;">Valider mon inscription</a></td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                    <!--[if mso | IE]></td></tr></table><![endif]--></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <!--[if mso | IE]></td></tr></table><![endif]--></td>
                      </tr>
                    </tbody>
                  </table>
                  <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                  <div style="margin:0px auto;max-width:600px;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                      <tbody>
                        <tr>
                          <td style="border-top:1px solid #D7DEE4;direction:ltr;font-size:0px;padding:16px 0;text-align:center;">
                            <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                              <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                <tbody>
                                  <tr>
                                    <td align="left" style="font-size:0px;padding:8px 16px;word-break:break-word;">
                                      <div style="font-family: Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;font-size:12px;line-height:16px;text-align:left;color:#AAB6BD;">
                                        &copy; 2021 lood &ndash; Tous droits r&eacute;serv&eacute;s.</div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if mso | IE]></td></tr></table><![endif]--></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso | IE]></td></tr></table><![endif]--></div>
                  <br />
                </body>`,
                  CustomID: 'AppGettingStartedTest',
                },
              ],
            });
          request
            .then(() => {
              console.log("email d'activation envoyé");
            })
            .catch((err: unknown) => {
              console.log(err);
            });
        } catch (err) {
          throw new UnauthorizedError("Vous n'êtes pas connecté");
        }
        return user;
      } else {
        throw new CreationError();
      }
    },

    async activateUser(
      _: void,
      data: { token: string }
    ): Promise<UserWithToken> {
      const token = data.token;
      const payload = decode(token, SECRET_KEY);

      let userAccount: IUser;
      try {
        // récupère le compte de l'utilisateur
        userAccount = await UserSchema.findOne({ email: payload.email });
      } catch (err) {
        throw new UnauthorizedError("Vous n'êtes pas connecté");
      }

      if (payload.password === userAccount.password) {
        // change son statut
        const activeUser = await UserSchema.findByIdAndUpdate(
          userAccount._id,
          { status: 'active' },
          { new: true }
        );

        // envoie les données de l'utilisateur et son token
        return { user: activeUser, token };
      } else {
        throw new UnauthorizedError("Vous n'êtes pas connecté.");
      }
    },

    async loginUser(_: void, data: ILoginUser): Promise<UserWithToken> {
      const errors: string[] = [];
      if (errors.length) {
        throw new InputError(errors);
      }

      const { email, password } = data;
      const findUserByEmail = await UserSchema.findOne({ email });

      if (!findUserByEmail) {
        throw new NotFoundError("L'email n'appartient à aucun looder");
      }

      const auth = await bcrypt.compare(password, findUserByEmail?.password);

      if (!auth) {
        throw new Error();
      }

      const token = createToken({ payload: { id: findUserByEmail._id } });

      return { token, user: findUserByEmail };
    },

    async sendEmailReinitPassword(
      _: void,
      data: { email: string }
    ): Promise<sendString> {
      const sendTo = data.email;
      const findUserByEmail = await UserSchema.findOne({ email: sendTo });

      if (findUserByEmail) {
        // envoi mail
        try {
          const token = usePasswordHashToMakeToken({
            mail: sendTo,
            password: findUserByEmail.password,
            id: findUserByEmail._id,
          });

          // url pour réinitialiser le mdp
          const url = `http://localhost:4200/reinitialiser-mot-de-passe/${token}`;

          // création du mail de réinitialisation
          const request = mailjetClient
            .post('send', { version: 'v3.1' })
            .request({
              Messages: [
                {
                  From: {
                    Email: 'mathilde.thoraninth@gmail.com',
                    Name: 'lood',
                  },
                  To: [
                    {
                      Email: sendTo,
                    },
                  ],
                  Subject: 'Réinitialises ton mot de passe lood',
                  TextPart: 'Réinitialises ton mot de passe lood',
                  HTMLPart: `<!doctype html><body><title></title>
                  <!--[if !mso]><!-->
                  <meta content="IE=edge" http-equiv="X-UA-Compatible" />
                  <!--<![endif]-->
                  <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
                  <meta content="width=device-width, initial-scale=1" name="viewport" />
                  <style type="text/css">
                  #outlook a { padding:0; }
                                          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
                                          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
                                          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
                                          p { display:block;margin:16px 0; }</style>
                  <!--[if mso]>
                                        <xml>
                                        <o:OfficeDocumentSettings>
                                          <o:AllowPNG/>
                                          <o:PixelsPerInch>96</o:PixelsPerInch>
                                        </o:OfficeDocumentSettings>
                                        </xml>
                                        <![endif]--><!--[if lte mso 11]>
                                        <style type="text/css">
                                          .mj-outlook-group-fix { width:100% !important; }
                                        </style>
                                        <![endif]--><!--[if !mso]><!-->
                  <style type="text/css">
                  @import url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap);</style>
                  <!--<![endif]-->
                  <style type="text/css">
                  td.td-link--login {
                                      font-size:0px;padding:8px 24px;word-break:break-word;
                                      }
                                      @media only screen and (min-width:480px) {
                                        .mj-column-per-20 { width:20% !important; max-width: 20%; }
                                .mj-column-per-80 { width:80% !important; max-width: 80%; }
                                .mj-column-per-100 { width:100% !important; max-width: 100%; }
                                      }</style>
                  <style type="text/css">
                  @media only screen and (max-width:480px) {
                                      table.mj-full-width-mobile { width: 100% !important; }
                                      td.mj-full-width-mobile { width: auto !important; }
                                          td.td-link--login {
                                           padding-left:0;
                                          text-align:left;
                                          }
                                    }</style>
                  <div style="background-color:#ffffff;border-top:4px solid #ed71a8;font-family: Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif">
                    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                  <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;">
                    <tbody>
                      <tr>
                        <td style="direction:ltr;font-size:0px;padding:0;text-align:center;display: flex;align-items: center;">
                          <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:114.4px;" ><![endif]-->
                          <div class="mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                              <tbody>
                                <tr>
                                  <td align="left" style="font-size:0px;padding:0px;word-break:break-word;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
                                      <tbody>
                                        <tr>
                                          <td style="width:114px;">
                                            <a href="http://localhost:4200" target="_blank"> 
<img src="https://x9g0m.mjt.lu/tplimg/x9g0m/b/sth4x/5vx0.png" alt="logo lood" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100;font-size:13px;" width="100" /> </a></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                         </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;max-width:600px;">
                      <br />
                      &nbsp;</div>
                    <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                      <tbody>
                        <tr>
                          <td>
                            <div style="margin:0px auto;max-width:600px;">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                                <tbody>
                                  <tr>
                                    <td style="direction:ltr;font-size:0px;padding:0px 16px;text-align:center;">
                                      <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                          <tbody>
                                            <tr>
                                              <td align="left" style="font-size:0px;padding:0;word-break:break-word;">
                                                <div style="font-family: Poppins,  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;font-size:16px;line-height:24px;text-align:left;color:#525A65;">
                                                  <span style="color:#2f52a0;"><span style="font-size:18px;"><strong>Réinitialisation de ton mot de passe</strong></span></span><br />
                                                  <br />
                                                  <span style="color: #2f52a0; font-family: Poppins, Tahoma, Geneva, sans-serif, sans-serif;font-weight:400">Afin de réinitialiser ton mot de passe, il te suffit de cliquer sur le bouton ci-dessous.</span></div>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td align="left" style="font-size:0px;padding:24px 0;word-break:break-word;" vertical-align="middle">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:separate;line-height:100%;">
                                                  <tbody>
                                                    <tr>
                                                      <td align="center" bgcolor="#ed71a8" role="presentation" style="border:none;border-radius:4px;cursor:auto;mso-padding-alt:10px 25px;background:#ed71a8;" valign="middle">
                                                        <a href="${url}" style="display:inline-block;background:#ed71a8;color:#ffffff;font-family: Poppins,  -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;font-size:13px;font-weight:500;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:16px 24px;mso-padding-alt:0px;border-radius:8px;">Réinitialiser mon mot de passe</a></td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                      <!--[if mso | IE]></td></tr></table><![endif]--></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <!--[if mso | IE]></td></tr></table><![endif]--></td>
                        </tr>
                      </tbody>
                    </table>
                    <!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
                    <div style="margin:0px auto;max-width:600px;">
                      <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                        <tbody>
                          <tr>
                            <td style="border-top:1px solid #D7DEE4;direction:ltr;font-size:0px;padding:16px 0;text-align:center;">
                              <!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
                              <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                  <tbody>
                                    <tr>
                                      <td align="left" style="font-size:0px;padding:8px 16px;word-break:break-word;">
                                        <div style="font-family: Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;font-size:12px;line-height:16px;text-align:left;color:#AAB6BD;">
                                          &copy; 2021 lood &ndash; Tous droits r&eacute;serv&eacute;s.</div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <!--[if mso | IE]></td></tr></table><![endif]--></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!--[if mso | IE]></td></tr></table><![endif]--></div>
                  <br /></body>`,
                  CustomID: 'AppGettingStartedTest',
                },
              ],
            });
          request
            .then(() => {
              console.log('email de réinitialisation envoyé');
            })
            .catch((err: unknown) => {
              console.log(err);
            });
        } catch (err) {
          throw new NotFoundError("L'email n'appartient à aucun looder");
        }
        return { message: 'Email envoyé' };
      } else {
        throw new NotFoundError("L'email n'appartient à aucun looder");
      }
    },

    async reinitPassword(
      _: void,
      data: { password: string; token: string }
    ): Promise<sendString> {
      const newPassword = data.password;
      const token = data.token;
      const payload = decode(token, SECRET_KEY);

      let userAccount: IUser;
      try {
        // récupère le compte de l'utilisateur par son email
        userAccount = await UserSchema.findOne({ email: payload.mail });
      } catch (err) {
        throw new UnauthorizedError("L'email n'appartient à aucun looder");
      }

      // change le mot de passe
      if (userAccount.password === payload.password) {
        const newHashPassword = bcrypt.hashSync(newPassword, 10);

        const newAccount = await UserSchema.findByIdAndUpdate(
          userAccount._id,
          { password: newHashPassword },
          { new: true }
        );

        console.log('new account', newAccount);
        return { message: 'Ton mot de passe a été modifié' };
      } else {
        throw new NotFoundError(
          'Un problème est survenu, essaie de réactualiser la page'
        );
      }
    },

    async updateUserProfil(
      _: void,
      data: UserInput,
      context: Icontext
    ): Promise<IUser> {
      if (!context.user.id)
        throw new UnauthorizedError("Vous n'êtes pas connecté.");

      const userId = data._id;

      if (!userId) throw new UnauthorizedError("Vous n'êtes pas connecté.");

      const errors = validateData(data.userInput);
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        errors.push('User id is missing.');
      }

      if (errors.length) {
        throw new InputError(errors);
      }

      const updatedUserProfil = new UserSchema({ ...data.userInput });

      if (updatedUserProfil) {
        await UserSchema.findByIdAndUpdate(
          userId,
          {
            ...data.userInput,
          },
          { new: true }
        );

        return updatedUserProfil;
      } else {
        throw new CreationError(['Issue with user profil update.']);
      }
    },

    async updateUserEmail(
      _: void,
      data: IUser,
      context: Icontext
    ): Promise<IUser> {
      if (!context.user.id)
        throw new UnauthorizedError("Vous n'êtes pas connecté.");

      const userId = data._id;
      const { email } = data;

      if (!userId) throw new UnauthorizedError("Vous n'êtes pas connecté.");

      const errors = validateData(data);
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        errors.push('User id is missing.');
      }

      const userBefore = await UserSchema.findById(userId);

      // email already taken
      const userWithSameEmail = await UserSchema.findOne({ email });
      if (userWithSameEmail && userWithSameEmail.email !== userBefore.email) {
        throw new BadRequestError(`Un looder est déjà inscrit avec cet email`);
      }
      if (errors.length) {
        throw new InputError(errors);
      }

      const updatedUserMail = new UserSchema({ ...data });

      if (updatedUserMail) {
        await UserSchema.findByIdAndUpdate(
          userId,
          {
            ...data,
          },
          { new: true }
        );

        return updatedUserMail;
      } else {
        throw new CreationError(['Issue with user email update.']);
      }
    },

    async updateUserPassword(
      _: void,
      data: IUser,
      context: Icontext
    ): Promise<IUser> {
      if (!context.user.id)
        throw new UnauthorizedError("Vous n'êtes pas connecté.");

      const userId = data._id;

      if (!userId) throw new UnauthorizedError("Vous n'êtes pas connecté.");

      const errors = validateData(data);
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        errors.push('User id is missing.');
      }

      const userBefore: IUser = await UserSchema.findById(userId);

      // change password
      const noChangePassword = bcrypt.compareSync(
        data.password,
        userBefore.password
      );
      let userData = {};
      if (noChangePassword) {
        userData = { ...userBefore._doc };
      } else {
        const hashPassword = bcrypt.hashSync(data.password, 10);
        userData = { ...userBefore._doc, password: hashPassword };
      }

      const updatedUserPassword = new UserSchema(userData);

      if (updatedUserPassword) {
        await UserSchema.findByIdAndUpdate(
          userId,
          {
            ...userData,
          },
          { new: true }
        );

        return updatedUserPassword;
      } else {
        throw new CreationError(['Issue with user password update.']);
      }
    },

    async deleteUser(_: void, { _id }, context: Icontext): Promise<IUser> {
      if (!context.user.id)
        throw new UnauthorizedError("Vous n'êtes pas connecté.");

      const errors = [];
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        errors.push('missing Id input');
      }
      if (errors.length) {
        throw new InputError(errors);
      }

      const deletedUser = await UserSchema.findByIdAndDelete({ _id });

      if (!deletedUser) {
        throw new CreationError(['issue with deleted user']);
      }
      return deletedUser;
    },

    async likeFood(_: void, { foodId }, context: Icontext): Promise<IUser> {
      if (!context.user.id)
        throw new UnauthorizedError("Vous n'êtes pas connecté.");

      const food = await FoodSchema.findById(foodId);

      if (!food) {
        throw new CreationError(['issue with like food']);
      }

      const likedFood = UserSchema.findByIdAndUpdate(
        context.user.id,
        {
          $push: { favorite_food: foodId },
        },
        {
          new: true,
        }
      );
      return likedFood;
    },
  },
};
