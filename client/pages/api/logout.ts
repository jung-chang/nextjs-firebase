import { unsetAuthCookies } from 'next-firebase-auth'
import initAuth from "utils/firebase";

initAuth();

const handler = async (req, res) => {
    try {
        console.log("LOGOUT");
        await unsetAuthCookies(req, res);
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Unexpected error.' });
    }
    return res.status(200).json({ status: true });
}

export default handler;