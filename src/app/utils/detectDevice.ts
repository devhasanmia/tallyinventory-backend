// middleware/deviceInfo.ts
import { Request, Response, NextFunction } from 'express';
import DeviceDetector from 'device-detector-js';

const deviceDetector = new DeviceDetector();

const deviceInfoMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userAgent = req.headers['user-agent'] || '';
  const result = deviceDetector.parse(userAgent);
  req.deviceInfo = result;
  next();
};

export default deviceInfoMiddleware;
