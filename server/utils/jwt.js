import jwt from "jsonwebtoken";

const config = useRuntimeConfig();

const generateAccessToken = (user) => {
  return jwt.sign({ userId: user.id }, config.jwtAccessToken, {
    expiresIn: "10m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ userId: user.id }, config.jwtRefreshToken, {
    expiresIn: "4h",
  });
};

export const decodeRefreshToken = (token) => {
  try {
    return jwt.verify(token, config.jwtRefreshToken);
  } catch (error) {
    return null;
  }
};

export const decodeAccessToken = (token) => {
  try {
    return jwt.verify(token, config.jwtAccessToken);
  } catch (error) {
    return null;
  }
};

export const generateToken = (user) => {
  const accessToken = generateAccessToken(user);

  const refreshToken = generateRefreshToken(user);

  return {
    accessToken,
    refreshToken,
  };
};

export const sendRefreshToken = (event, token) => {
  setCookie(event, "refreshToken", token, {
    httpOnly: true,
    sameSite: true,
  });
};
