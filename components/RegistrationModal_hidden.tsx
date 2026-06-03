"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, CheckCircle2, ChevronRight, ChevronLeft, Upload, Link as LinkIcon, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  startup_name: z.string().min(2, "Startup name is required"),
  team_head: z.string().min(2, "Team head name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  members: z.array(z.object({ name: z.string().min(2, "Name required") })).min(1),
  description: z.string().min(20, "Please provide more details about your startup"),
  stage: z.string().min(1, "Please select a stage"),
  linkedin_url: z.string().url("Valid LinkedIn URL required").optional().or(z.literal("")),
  website_url: z.string().url("Valid website URL required").optional().or(z.literal("")),
  pitch_video_url: z.string().url("Valid video link required").optional().or(z.literal("")),
  // For actual file upload, we'd handle it separately or use a custom zod schema
});

type FormValues = z.infer<typeof formSchema>;

const STAGES = [
  "Idea / Concept",
  "Prototype / MVP",
  "Early Revenue",
  "Growth / Scaling",
];

export default function RegistrationModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  
  const { register, handleSubmit, control, formState: { errors }, trigger, watch, setValue, reset } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      members: [{ name: "" }],
      stage: "",
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "members"
  });

  const teamHead = watch("team_head");
  
  // Auto-fill first member with team head if empty
  useEffect(() => {
    if (teamHead && fields.length > 0 && !fields[0].name) {
      setValue("members.0.name", teamHead);
    }
  }, [teamHead, fields, setValue]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setTimeout(() => {
        setStep(1);
        setIsSuccess(false);
        setSubmitError("");
        reset();
      }, 300);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, reset]);

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["startup_name", "team_head", "phone"];
    if (step === 2) fieldsToValidate = ["members"];
    if (step === 3) fieldsToValidate = ["description", "stage", "linkedin_url", "website_url"];
    
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => s - 1);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      // Submit to MongoDB /api/applications — also syncs to Google Sheets automatically
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, member_count: data.members.length }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Submission failed. Please try again.");
      }
      setIsSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full h-full sm:h-auto max-w-2xl bg-surface sm:rounded-3xl sm:border border-white/10 shadow-2xl flex flex-col max-h-[100dvh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-4 sm:p-6 border-b border-white/10 glass sm:rounded-t-3xl z-10 sticky top-0">
          <div>
            <h2 className="text-xl font-display font-semibold">Apply to Pitch</h2>
            {!isSuccess && (
              <p className="text-xs text-white/50 font-mono mt-1">Step {step} of 4</p>
            )}
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 transition-colors glass">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {!isSuccess && (
          <div className="h-1 w-full bg-white/5">
            <div 
              className="h-full bg-gradient-to-r from-gold-600 to-gold-400 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-center py-12 space-y-6">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center text-green-500 mb-4 animate-in zoom-in">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-3xl font-display font-bold">Application Received</h3>
              <p className="text-white/60 max-w-md">
                Your pitch application has been securely submitted to the AarambhX review board. We will get back to you within 7 days.
              </p>
              <button 
                onClick={onClose}
                className="mt-8 bg-white/10 hover:bg-white/20 px-8 py-3 rounded-full font-medium transition-colors"
              >
                Return to Site
              </button>
            </div>
          ) : (
            <form id="apply-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* STEP 1: Basics */}
              <div className={cn("space-y-6", step !== 1 && "hidden")}>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gold-400 mb-1">Basic details to identify your startup</h3>
                  <p className="text-sm text-white/50">Let's start with the fundamentals.</p>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Startup Name</label>
                  <input 
                    {...register("startup_name")}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all"
                    placeholder="E.g. Acme Corp"
                  />
                  {errors.startup_name && <p className="text-red-400 text-xs">{errors.startup_name.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Team Head / Founder Name</label>
                  <input 
                    {...register("team_head")}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all"
                    placeholder="John Doe"
                  />
                  {errors.team_head && <p className="text-red-400 text-xs">{errors.team_head.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Phone Number</label>
                  <input 
                    {...register("phone")}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all"
                    placeholder="+91 9876543210"
                  />
                  {errors.phone && <p className="text-red-400 text-xs">{errors.phone.message}</p>}
                </div>
              </div>

              {/* STEP 2: Team */}
              <div className={cn("space-y-6", step !== 2 && "hidden")}>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gold-400 mb-1">Who is building this with you?</h3>
                  <p className="text-sm text-white/50">Add all core team members.</p>
                </div>

                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-3">
                      <div className="flex-1 space-y-2">
                        <label className="text-xs font-mono text-white/50 uppercase">Member {index + 1}</label>
                        <input 
                          {...register(`members.${index}.name` as const)}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500/50 transition-all"
                          placeholder="Member Name"
                        />
                        {errors?.members?.[index]?.name && (
                          <p className="text-red-400 text-xs">{errors.members[index]?.name?.message}</p>
                        )}
                      </div>
                      {index > 0 && (
                        <button 
                          type="button" 
                          onClick={() => remove(index)}
                          className="mt-8 p-3 text-red-400/70 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                <button 
                  type="button"
                  onClick={() => append({ name: "" })}
                  className="flex items-center gap-2 text-sm text-gold-400 hover:text-gold-300 transition-colors py-2"
                >
                  <Plus className="w-4 h-4" /> Add Team Member
                </button>
              </div>

              {/* STEP 3: Vision */}
              <div className={cn("space-y-6", step !== 3 && "hidden")}>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gold-400 mb-1">Help us understand your business</h3>
                  <p className="text-sm text-white/50">Traction and product details.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">Select your current traction stage</label>
                  <select 
                    {...register("stage")}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500/50 transition-all appearance-none text-white"
                  >
                    <option value="" disabled className="text-gray-500">Select stage...</option>
                    {STAGES.map(s => (
                      <option key={s} value={s} className="bg-surface">{s}</option>
                    ))}
                  </select>
                  {errors.stage && <p className="text-red-400 text-xs">{errors.stage.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/80">What problem are you solving and for whom?</label>
                  <textarea 
                    {...register("description")}
                    rows={4}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500/50 transition-all resize-none"
                    placeholder="Briefly describe your startup..."
                  />
                  {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Website (Optional)</label>
                    <input 
                      {...register("website_url")}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500/50 transition-all"
                      placeholder="https://"
                    />
                    {errors.website_url && <p className="text-red-400 text-xs">{errors.website_url.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">LinkedIn (Optional)</label>
                    <input 
                      {...register("linkedin_url")}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-gold-500/50 transition-all"
                      placeholder="https://linkedin.com/..."
                    />
                    {errors.linkedin_url && <p className="text-red-400 text-xs">{errors.linkedin_url.message}</p>}
                  </div>
                </div>
              </div>

              {/* STEP 4: Pitch */}
              <div className={cn("space-y-6", step !== 4 && "hidden")}>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gold-400 mb-1">Show us your pitch (this matters most)</h3>
                  <p className="text-sm text-amber-200/80 bg-amber-500/10 p-3 rounded-xl mt-3 border border-amber-500/20">
                    💡 Applications with clear pitch videos are prioritized by the review board.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Pitch Video Link</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <input 
                        {...register("pitch_video_url")}
                        className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-gold-500/50 transition-all"
                        placeholder="YouTube, Google Drive, Loom..."
                      />
                    </div>
                    {errors.pitch_video_url && <p className="text-red-400 text-xs">{errors.pitch_video_url.message}</p>}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase font-mono">
                      <span className="bg-surface px-2 text-white/40">OR UPLOAD</span>
                    </div>
                  </div>

                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:bg-white/5 transition-colors cursor-pointer group">
                    <Upload className="w-8 h-8 text-white/40 mx-auto mb-3 group-hover:text-gold-400 transition-colors" />
                    <p className="text-sm text-white/80 font-medium mb-1">Click to upload video file</p>
                    <p className="text-xs text-white/40 font-mono">MP4, WebM up to 100MB</p>
                    {/* TODO: Add real file input and upload handler (Supabase storage) */}
                    <input type="file" className="hidden" accept="video/*" />
                  </div>
                </div>
              </div>

            </form>
          )}
        </div>

        {/* Footer (Actions) */}
        {!isSuccess && (
          <div className="flex-shrink-0 flex flex-col gap-3 p-4 sm:p-6 border-t border-white/10 glass sm:rounded-b-3xl mt-auto z-10 sticky bottom-0">
            {submitError && (
              <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
                {submitError}
              </p>
            )}
            <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={prevStep}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-colors",
                step === 1 ? "invisible" : "hover:bg-white/10"
              )}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            
            {step < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-medium hover:bg-white/90 transition-colors"
              >
                Next Step <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                form="apply-form"
                disabled={isSubmitting}
                className="flex items-center gap-2 bg-gradient-to-r from-gold-500 to-amber-500 text-black px-8 py-2.5 rounded-full font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
