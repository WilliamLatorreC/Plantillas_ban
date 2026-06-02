import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

  console.log("AUTH:", req.headers.authorization);
  console.log("JWT_SECRET:", process.env.JWT_SECRET);

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "No hay token"
    });
  }

  try {

    const decoded = jwt.verify(
      token.replace("Bearer ", ""),
      process.env.JWT_SECRET
    );

    req.usuario = decoded;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({
      message: "Token inválido"
    });

  }
};
