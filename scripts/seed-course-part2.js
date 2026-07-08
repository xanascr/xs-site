import mongoose from "mongoose";
import Course from "../models/Course.js";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/xs-site";

const lessons = [