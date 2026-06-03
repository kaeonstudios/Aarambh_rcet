import { z } from 'zod';

export const applicationSchema = z.object({
  startup_name: z.string().min(2, "Startup name is required"),
  team_head: z.string().min(2, "Team head name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  member_count: z.number().int().min(1),
  members: z.array(z.string()).default([]), // Expected JSON array of member names/details
  description: z.string().min(10, "Description is too short"),
  stage: z.string().min(2, "Stage is required"),
  linkedin_url: z.string().url("Invalid LinkedIn URL").optional().or(z.literal('')),
  website_url: z.string().url("Invalid Website URL").optional().or(z.literal('')),
  pitch_video_url: z.string().url("Invalid Pitch Video URL").optional().or(z.literal('')),
  pitch_video_path: z.string().optional(),
});
