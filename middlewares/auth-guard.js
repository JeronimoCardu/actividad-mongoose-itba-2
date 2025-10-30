// auth-guard.js
const authGuard = (req, res, next) => {
  const tokenRecibido = req.headers['authorization'];
 
  if (tokenRecibido === 'admin123') {
    req.usuario = { id: 1, rol: 'admin' };
    next();
  } else {
    res.status(401).json({ mensaje: 'Acceso no autorizado.' });
  }
};
module.exports=authGuard;