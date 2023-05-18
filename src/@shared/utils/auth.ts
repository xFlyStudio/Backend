import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SIGN_SECRET;

export class JWT {
    static async verify(token: string) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    reject(err)
                } else {
                    resolve(decoded);
                }
            });
        })
    }
}