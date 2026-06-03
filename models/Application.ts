/**
 * Mongoose Application model.
 * Mirrors the form fields from the 4-step registration modal.
 */
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IApplication extends Document {
  startup_name: string;
  team_head: string;
  phone: string;
  member_count?: number;
  members?: { name: string }[];
  description: string;
  stage: string;
  linkedin_url?: string;
  website_url?: string;
  pitch_video_url?: string;
  pitch_video_path?: string;
  starred: boolean;
  created_at: Date;
}

const ApplicationSchema = new Schema<IApplication>(
  {
    startup_name:     { type: String, required: true },
    team_head:        { type: String, required: true },
    phone:            { type: String, required: true },
    member_count:     { type: Number },
    members:          [{ name: { type: String } }],
    description:      { type: String, required: true },
    stage:            { type: String, required: true },
    linkedin_url:     { type: String },
    website_url:      { type: String },
    pitch_video_url:  { type: String },
    pitch_video_path: { type: String },
    starred:          { type: Boolean, default: false },
    created_at:       { type: Date,   default: Date.now },
  },
  { timestamps: false }
);

// Prevent re-compiling in dev hot-reloads
const Application: Model<IApplication> =
  (mongoose.models.Application as Model<IApplication>) ||
  mongoose.model<IApplication>('Application', ApplicationSchema);

export default Application;
