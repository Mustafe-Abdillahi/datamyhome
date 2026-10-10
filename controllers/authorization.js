
export const authorization = (...role) => {
  return (req, res, next) => {

    if (!role.includes(req.user.role)) {
      return res.status(401).json(
        `access denied required of :[${role.join(',')}].`
      );
    }
    next();
  };
};