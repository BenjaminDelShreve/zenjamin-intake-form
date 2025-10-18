"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, Lightbulb, Palette, Target, Upload } from "lucide-react"

export default function IntakeForm() {

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Whimsical background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-chart-3/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] bg-clip-text text-transparent animate-[gradient-shift_3s_ease-in-out_infinite]">
              Zenjamin Dev
            </h1>
            <Sparkles className="w-8 h-8 text-accent" />
          </div>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            {"Let's create something amazing together! ✨"}
          </p>
          <p className="text-sm text-muted-foreground mt-2">Tell us about your vision and we'll bring it to life</p>
        </div>

        <form action="https://formspree.io/f/xdkwbjjnd" method="POST" className="space-y-6">
          {/* Business Basics */}
          <Card className="shadow-lg hover:shadow-xl hover:scale-105 hover:bg-blue-50 active:scale-105 active:shadow-xl active:bg-blue-50 transition-all duration-300 ease-in-out rounded-lg p-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary hover:animate-bounce active:animate-bounce" />
                <CardTitle className="text-2xl">Business Basics</CardTitle>
                <span className="text-xl hover:animate-bounce active:animate-bounce">💡</span>
              </div>
              <CardDescription>The essentials — who you are and how we can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    placeholder="Your awesome company"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Your Name *</Label>
                  <Input
                    id="contactName"
                    name="contactName"
                    placeholder="What should we call you?"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="hello@yourcompany.com"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Current Website (if any)</Label>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="www.yoursite.com"
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </CardContent>
          </Card>

          {/* About Your Brand */}
          <Card className="shadow-lg hover:shadow-xl hover:scale-105 hover:bg-blue-50 active:scale-105 active:shadow-xl active:bg-blue-50 transition-all duration-300 ease-in-out rounded-lg p-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent hover:animate-bounce active:animate-bounce" />
                <CardTitle className="text-2xl">About Your Brand</CardTitle>
                <span className="text-xl hover:animate-bounce active:animate-bounce">✨</span>
              </div>
              <CardDescription>Help us understand what makes you unique</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessDescription">What does your business do? *</Label>
                <Textarea
                  id="businessDescription"
                  name="businessDescription"
                  placeholder="Tell us your story in a few sentences..."
                  className="min-h-24 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Who are your dream customers?</Label>
                <Input
                  id="targetAudience"
                  name="targetAudience"
                  placeholder="e.g., Small business owners, creative professionals..."
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="uniqueValue">What makes you different?</Label>
                <Textarea
                  id="uniqueValue"
                  name="uniqueValue"
                  placeholder="Your secret sauce, your superpower, what sets you apart..."
                  className="min-h-20 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Visual Style & Vibe */}
          <Card className="shadow-lg hover:shadow-xl hover:scale-105 hover:bg-blue-50 active:scale-105 active:shadow-xl active:bg-blue-50 transition-all duration-300 ease-in-out rounded-lg p-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-chart-3 hover:rotate-6 active:rotate-6" />
                <CardTitle className="text-2xl">Visual Style & Vibe</CardTitle>
                <span className="text-xl hover:rotate-6 active:rotate-6">🎨</span>
              </div>
              <CardDescription>{"Let's talk aesthetics — what catches your eye?"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>What style speaks to you? *</Label>
                <RadioGroup
                  name="stylePreference"
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="modern-minimal" id="modern-minimal" name="stylePreference" />
                    <Label htmlFor="modern-minimal" className="cursor-pointer flex-1">
                      Modern & Minimal — Clean lines, lots of white space
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="bold-colorful" id="bold-colorful" name="stylePreference" />
                    <Label htmlFor="bold-colorful" className="cursor-pointer flex-1">
                      Bold & Colorful — Eye-catching, vibrant, energetic
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="elegant-sophisticated" id="elegant-sophisticated" name="stylePreference" />
                    <Label htmlFor="elegant-sophisticated" className="cursor-pointer flex-1">
                      Elegant & Sophisticated — Refined, luxurious, timeless
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="playful-creative" id="playful-creative" name="stylePreference" />
                    <Label htmlFor="playful-creative" className="cursor-pointer flex-1">
                      Playful & Creative — Fun, quirky, imaginative
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="colorPreferences">Any color preferences?</Label>
                <Input
                  id="colorPreferences"
                  name="colorPreferences"
                  placeholder="e.g., Ocean blues, warm earth tones, neon accents..."
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inspirationSites">Websites you love</Label>
                <Textarea
                  id="inspirationSites"
                  name="inspirationSites"
                  placeholder="Share some URLs of sites that inspire you (one per line)"
                  className="min-h-20 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Website Goals */}
          <Card className="shadow-lg hover:shadow-xl hover:scale-105 hover:bg-blue-50 active:scale-105 active:shadow-xl active:bg-blue-50 transition-all duration-300 ease-in-out rounded-lg p-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent hover:animate-bounce active:animate-bounce" />
                <CardTitle className="text-2xl">Website Goals</CardTitle>
                <span className="text-xl hover:animate-bounce active:animate-bounce">🎯</span>
              </div>
              <CardDescription>What do you want your website to accomplish?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Primary goal for your website *</Label>
                <RadioGroup
                  name="primaryGoal"
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="generate-leads" id="generate-leads" name="primaryGoal" />
                    <Label htmlFor="generate-leads" className="cursor-pointer flex-1">
                      Generate leads & grow my email list
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="sell-products" id="sell-products" name="primaryGoal" />
                    <Label htmlFor="sell-products" className="cursor-pointer flex-1">
                      Sell products or services online
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="showcase-portfolio" id="showcase-portfolio" name="primaryGoal" />
                    <Label htmlFor="showcase-portfolio" className="cursor-pointer flex-1">
                      Showcase my work & portfolio
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="build-community" id="build-community" name="primaryGoal" />
                    <Label htmlFor="build-community" className="cursor-pointer flex-1">
                      Build a community & share content
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <RadioGroupItem value="establish-credibility" id="establish-credibility" name="primaryGoal" />
                    <Label htmlFor="establish-credibility" className="cursor-pointer flex-1">
                      Establish credibility & brand presence
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label>Features you'd like to include</Label>
                <div className="space-y-2">
                  {[
                    "Contact form",
                    "Blog or news section",
                    "E-commerce / online store",
                    "Photo gallery",
                    "Video content",
                    "Customer testimonials",
                    "Newsletter signup",
                    "Social media integration",
                    "Booking / scheduling system",
                    "Member login area",
                  ].map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <Checkbox
                        id={feature}
                        name="features"
                        value={feature}
                      />
                      <Label htmlFor={feature} className="cursor-pointer flex-1">
                        {feature}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timeline">When do you need this?</Label>
                  <Input
                    id="timeline"
                    name="timeline"
                    placeholder="e.g., ASAP, 2-3 months, flexible..."
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget range</Label>
                  <Input
                    id="budget"
                    name="budget"
                    placeholder="e.g., $5k-10k, flexible..."
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photos, Logos & Files */}
          <Card className="shadow-lg hover:shadow-xl hover:scale-105 hover:bg-blue-50 active:scale-105 active:shadow-xl active:bg-blue-50 transition-all duration-300 ease-in-out rounded-lg p-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary hover:rotate-6 active:rotate-6" />
                <CardTitle className="text-2xl">Photos, Logos & Files</CardTitle>
                <span className="text-xl hover:rotate-6 active:rotate-6">📁</span>
              </div>
              <CardDescription>Got assets to share? Drop links or let us know what you have</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Anything else we should know?</Label>
                <Textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  placeholder="Share file links (Google Drive, Dropbox, etc.), special requests, or anything else on your mind..."
                  className="min-h-32 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div className="p-6 border-2 border-dashed border-border rounded-lg text-center bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {"You can also email files directly to hello@zenjamindev.com"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <Button
              type="submit"
              size="lg"
              className="w-full md:w-auto px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 animate-[gradient-shift_3s_ease-in-out_infinite]"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {"Let's Build This!"}
              <Sparkles className="w-5 h-5 ml-2" />
            </Button>

            <p className="text-sm text-muted-foreground text-center text-balance">
              {"You're in great hands. This form is powered by "}
              <span className="font-semibold text-primary">Zenjamin Dev</span>
              {" ✨"}
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
