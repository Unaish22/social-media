"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Clock, Sparkles, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useContentStore } from "@/lib/content-store";
import { useOnboarding } from "@/components/onboarding/onboarding-context";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";

export function SchedulePost() {
  const { selectedPlatforms } = useOnboarding();
  const { selectedAssets } = useContentStore();
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState("10:00");
  const [ampm, setAmpm] = useState("am");
  const [scheduleType, setScheduleType] = useState("schedule");
  const [repeat, setRepeat] = useState("none");
  const [bestTime, setBestTime] = useState({
    time: "7:30 PM",
    day: "Thursday",
    engagementBoost: 28,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const platform =
      Object.keys(selectedPlatforms).find(
        (p) => selectedPlatforms[p as keyof typeof selectedPlatforms]
      ) || "instagram";
    setBestTime(
      platform === "instagram"
        ? { time: "7:30 PM", day: "Thursday", engagementBoost: 28 }
        : { time: "6:00 PM", day: "Wednesday", engagementBoost: 25 }
    );
  }, [selectedPlatforms]);

  const handleSchedule = async () => {
    if (scheduleType === "now") setDate(new Date());
    if (scheduleType !== "best" && (!date || !time)) {
      toast({
        title: "Error",
        description: "Pick a date & time.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const scheduleDate =
        scheduleType === "best"
          ? new Date(
              `${bestTime.day}, ${new Date().getFullYear()} ${bestTime.time}`
            )
          : new Date(`${format(date!, "PPP")} ${time} ${ampm.toUpperCase()}`);

      const postData = {
        assets: selectedAssets,
        platforms: Object.keys(selectedPlatforms).filter(
          (p) => selectedPlatforms[p as keyof typeof selectedPlatforms]
        ),
        scheduleDate: scheduleDate.toISOString(),
        repeat,
        isHighPerforming: scheduleType === "best",
      };

      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!res.ok) throw new Error("Schedule failed");

      toast({
        title: "Success",
        description: `Scheduled for ${format(
          scheduleDate,
          "PPP 'at' h:mm a"
        )}${repeat !== "none" ? `, repeating ${repeat}` : ""}.`,
      });
      router.push("/dashboard/uploads");
    } catch {
      toast({
        title: "Error",
        description: "Could not schedule post.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6 max-w-2xl"
    >
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-6">Schedule Post</h2>
          <p className="text-muted-foreground mb-6">
            Choose when and how to post your content. You can also return to the{" "}
            <Link href="/dashboard" className="text-primary underline">
              Dashboard
            </Link>{" "}
            at any time.
          </p>

          <RadioGroup
            value={scheduleType}
            onValueChange={setScheduleType}
            className="space-y-6 mb-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="now" id="now" />
                <Label htmlFor="now" className="font-medium">
                  Post Now
                </Label>
              </div>
              <p className="text-sm text-muted-foreground ml-6">
                Publish your post immediately across selected platforms.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="schedule" id="schedule" />
                <Label htmlFor="schedule" className="font-medium">
                  Schedule for Later
                </Label>
              </div>
              <div className="ml-6 mt-2 space-y-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <div className="flex gap-2">
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-1/2"
                  />
                  <Select value={ampm} onValueChange={setAmpm}>
                    <SelectTrigger className="w-1/2">
                      <SelectValue placeholder="AM/PM" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="am">AM</SelectItem>
                      <SelectItem value="pm">PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="best" id="best" />
                <Label htmlFor="best" className="font-medium flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-primary" />
                  Best Time to Post
                </Label>
              </div>
              <p className="text-sm text-muted-foreground">
                Let AI determine the best time to post for maximum engagement.
              </p>
              <Card className="mt-4 shadow-sm rounded-lg">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
                    >
                      <Clock className="h-5 w-5 text-primary" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium">Recommended Time</p>
                      <p className="text-sm text-muted-foreground">
                        {bestTime.day} at {bestTime.time}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Based on your audience's activity patterns, this time has
                    shown {bestTime.engagementBoost}% higher engagement.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </RadioGroup>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Label className="text-base">Repeat Schedule (Optional)</Label>
            <Select value={repeat} onValueChange={setRepeat}>
              <SelectTrigger className="w-full mt-2 rounded-lg shadow-sm">
                <SelectValue placeholder="Don't repeat" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Don't repeat</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
        </CardContent>
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 flex gap-4"
      >
        <Button
          variant="outline"
          onClick={() => router.push("/preview")}
          className="flex-1 border-gray-300 shadow-sm hover:bg-gray-50 rounded-lg"
        >
          Back to Preview
        </Button>
        <Button
          className="flex-1 bg-blue-600 text-white hover:bg-blue-700 shadow-sm rounded-lg"
          onClick={handleSchedule}
          disabled={
            isSubmitting ||
            !Object.values(selectedAssets).some((v) =>
              Array.isArray(v) ? v.length : !!v
            )
          }
        >
          {isSubmitting ? (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4 animate-spin" />
              Processing…
            </>
          ) : (
            <>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Next
            </>
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}