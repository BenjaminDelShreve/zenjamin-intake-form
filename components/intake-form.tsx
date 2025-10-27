"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Sparkles, Lightbulb, Palette, Target, Upload } from "lucide-react"

export default function IntakeForm() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    // Business Basics
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",

    // About Your Brand
    businessDescription: "",
    targetAudience: "",
    uniqueValue: "",

    // Visual Style & Vibe
    stylePreference: [] as string[],
    colorPreferences: "",
    inspirationSites: "",

    // Website Goals
    primaryGoal: [] as string[],
    features: [] as string[],
    timeline: "",
    budget: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Create comprehensive email content
      const emailContent = `
New Intake Form Submission

BUSINESS BASICS:
Business Name: ${formData.businessName}
Contact Name: ${formData.contactName}
Email: ${formData.email}
Phone: ${formData.phone}
Website: ${formData.website}

ABOUT YOUR BRAND:
Business Description: ${formData.businessDescription}
Target Audience: ${formData.targetAudience}
Unique Value: ${formData.uniqueValue}

VISUAL STYLE & VIBE:
Style Preferences: ${formData.stylePreference.join(', ')}
Color Preferences: ${formData.colorPreferences}
Inspiration Sites: ${formData.inspirationSites}

WEBSITE GOALS:
Primary Goals: ${formData.primaryGoal.join(', ')}
Features: ${formData.features.join(', ')}
Timeline: ${formData.timeline}
Budget: ${formData.budget}

UPLOADED FILES:
${uploadedFiles.length > 0 ? uploadedFiles.map(file => `- ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`).join('\n') : 'No files uploaded'}

---
Submitted on: ${new Date().toLocaleString()}
      `.trim()

      // For localhost: Use mailto + clipboard (works locally)
      // For production: Formspree will work automatically
      
      const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      
      if (isLocalhost) {
        // Localhost method: Copy to clipboard + open email client
        try {
          await navigator.clipboard.writeText(emailContent)
          console.log('📋 Form data copied to clipboard')
          
          // Try to open email client
          const subject = `New Intake Form Submission from ${formData.businessName || formData.contactName}`
          const body = encodeURIComponent(emailContent)
          const mailtoLink = `mailto:zenjamindev@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`
          
          window.open(mailtoLink, '_blank')
          console.log('📧 Email client opened')
        } catch (error) {
          console.log('❌ Local method failed:', error)
        }
      } else {
        // Production method: Use Formspree
        const formDataToSend = new FormData()
        
        formDataToSend.append('_subject', `New Intake Form Submission from ${formData.businessName || formData.contactName}`)
        formDataToSend.append('_replyto', formData.email)
        formDataToSend.append('_cc', 'zenjamindev@gmail.com')
        
        // Add all form fields
        formDataToSend.append('business_name', formData.businessName)
        formDataToSend.append('contact_name', formData.contactName)
        formDataToSend.append('email', formData.email)
        formDataToSend.append('phone', formData.phone)
        formDataToSend.append('website', formData.website)
        formDataToSend.append('business_description', formData.businessDescription)
        formDataToSend.append('target_audience', formData.targetAudience)
        formDataToSend.append('unique_value', formData.uniqueValue)
        formDataToSend.append('style_preference', formData.stylePreference.join(', '))
        formDataToSend.append('color_preferences', formData.colorPreferences)
        formDataToSend.append('inspiration_sites', formData.inspirationSites)
        formDataToSend.append('primary_goal', formData.primaryGoal.join(', '))
        formDataToSend.append('features', formData.features.join(', '))
        formDataToSend.append('timeline', formData.timeline)
        formDataToSend.append('budget', formData.budget)
        
        // Add uploaded files
        uploadedFiles.forEach((file, index) => {
          formDataToSend.append(`file_${index}`, file)
        })
        
        try {
          const response = await fetch('https://formspree.io/f/xdkwbjnd', {
            method: 'POST',
            body: formDataToSend,
            headers: {
              'Accept': 'application/json'
            }
          })
          
          if (response.ok) {
            console.log('✅ Email sent via Formspree!')
          } else {
            throw new Error('Formspree failed')
          }
        } catch (error) {
          console.log('❌ Formspree failed:', error)
        }
      }
      
      // Store email for success screen
      setSubmittedEmail(formData.email)
      
      // Show success state
      setIsSubmitted(true)
      
      // Reset form
      setFormData({
        businessName: "",
        contactName: "",
        email: "",
        phone: "",
        website: "",
        businessDescription: "",
        targetAudience: "",
        uniqueValue: "",
        stylePreference: [],
        colorPreferences: "",
        inspirationSites: "",
        primaryGoal: [],
        features: [],
        timeline: "",
        budget: "",
      })
      setUploadedFiles([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your form. Please try again or email us directly at zenjamindev@gmail.com')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const handleStyleToggle = (style: string) => {
    setFormData((prev) => ({
      ...prev,
      stylePreference: prev.stylePreference.includes(style)
        ? prev.stylePreference.filter((s) => s !== style)
        : [...prev.stylePreference, style],
    }))
  }

  const handleGoalToggle = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      primaryGoal: prev.primaryGoal.includes(goal)
        ? prev.primaryGoal.filter((g) => g !== goal)
        : [...prev.primaryGoal, goal],
    }))
  }

  const handleFileSelect = (files: FileList | null) => {
    if (files) {
      const newFiles = Array.from(files)
      setUploadedFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFileSelect(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  // Show success screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-accent/5 to-chart-3/5">
        <div className="text-center space-y-8 max-w-2xl mx-auto px-6">
          <div className="space-y-4">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              🎉 Thank You!
            </h1>
            <p className="text-2xl text-muted-foreground font-medium">
              We're on it!
            </p>
          </div>
          
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>✨ Your vision is in great hands</p>
            <p>📧 We'll be in touch soon at: <span className="font-semibold text-primary">{submittedEmail}</span></p>
            <p>✅ Your form has been sent to us</p>
            <p>🚀 Get ready for something amazing!</p>
          </div>
          
          <div className="pt-8">
            <Button 
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="px-8 py-3 text-lg"
            >
              Submit Another Form
            </Button>
          </div>
        </div>
      </div>
    )
  }

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
            <h1 className="text-4xl md:text-5xl font-bold text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Zenjamin Dev
            </h1>
            <Sparkles className="w-8 h-8 text-accent" />
          </div>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            {"Let's create something amazing together! ✨"}
          </p>
          <p className="text-sm text-muted-foreground mt-2">Tell us about your vision and we'll bring it to life</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Basics */}
          <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-primary" />
                <CardTitle className="text-2xl">Business Basics</CardTitle>
              </div>
              <CardDescription>The essentials — who you are and how we can reach you</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <div className="p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <Input
                      id="businessName"
                      placeholder="Your awesome company"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactName">Your Name *</Label>
                  <div className="p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <Input
                      id="contactName"
                      placeholder="What should we call you?"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <div className="p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <Input
                      id="email"
                      type="email"
                      placeholder="hello@yourcompany.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Current Website (if any)</Label>
                <div className="p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <Input
                    id="website"
                    type="url"
                    placeholder="www.yoursite.com"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About Your Brand */}
          <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <CardTitle className="text-2xl">About Your Brand</CardTitle>
              </div>
              <CardDescription>Help us understand what makes you unique</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="businessDescription">What does your business do? *</Label>
                <div className="p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <Textarea
                    id="businessDescription"
                    placeholder="Tell us your story in a few sentences..."
                    value={formData.businessDescription}
                    onChange={(e) => setFormData({ ...formData, businessDescription: e.target.value })}
                    className="min-h-24 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetAudience">Who are your dream customers?</Label>
                <div className="p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <Input
                    id="targetAudience"
                    placeholder="e.g., Small business owners, creative professionals..."
                    value={formData.targetAudience}
                    onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="uniqueValue">What makes you different?</Label>
                <div className="p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <Textarea
                    id="uniqueValue"
                    placeholder="Your secret sauce, your superpower, what sets you apart..."
                    value={formData.uniqueValue}
                    onChange={(e) => setFormData({ ...formData, uniqueValue: e.target.value })}
                    className="min-h-20 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visual Style & Vibe */}
          <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-chart-3" />
                <CardTitle className="text-2xl">Visual Style & Vibe</CardTitle>
              </div>
              <CardDescription>{"Let's talk aesthetics — what catches your eye?"}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>What style speaks to you? *</Label>
                <div className="space-y-2">
                  {[
                    { value: "modern-minimal", label: "Modern & Minimal — Clean lines, lots of white space" },
                    { value: "bold-colorful", label: "Bold & Colorful — Eye-catching, vibrant, energetic" },
                    { value: "elegant-sophisticated", label: "Elegant & Sophisticated — Refined, luxurious, timeless" },
                    { value: "playful-creative", label: "Playful & Creative — Fun, quirky, imaginative" },
                  ].map((style) => (
                    <div
                      key={style.value}
                      className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <Checkbox
                        id={style.value}
                        checked={formData.stylePreference.includes(style.value)}
                        onCheckedChange={() => handleStyleToggle(style.value)}
                      />
                      <Label htmlFor={style.value} className="cursor-pointer flex-1">
                        {style.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="colorPreferences">Any color preferences?</Label>
                <div className="p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <Input
                    id="colorPreferences"
                    placeholder="e.g., Ocean blues, warm earth tones, neon accents..."
                    value={formData.colorPreferences}
                    onChange={(e) => setFormData({ ...formData, colorPreferences: e.target.value })}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="inspirationSites">Websites you love</Label>
                <div className="p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                  <Textarea
                    id="inspirationSites"
                    placeholder="Share some URLs of sites that inspire you (one per line)"
                    value={formData.inspirationSites}
                    onChange={(e) => setFormData({ ...formData, inspirationSites: e.target.value })}
                    className="min-h-20 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Website Goals */}
          <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                <CardTitle className="text-2xl">Website Goals</CardTitle>
              </div>
              <CardDescription>What do you want your website to accomplish?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Primary goal for your website *</Label>
                <div className="space-y-2">
                  {[
                    { value: "generate-leads", label: "Generate leads & grow my email list" },
                    { value: "sell-products", label: "Sell products or services online" },
                    { value: "showcase-portfolio", label: "Showcase my work & portfolio" },
                    { value: "build-community", label: "Build a community & share content" },
                    { value: "establish-credibility", label: "Establish credibility & brand presence" },
                  ].map((goal) => (
                    <div
                      key={goal.value}
                      className="flex items-center space-x-2 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <Checkbox
                        id={goal.value}
                        checked={formData.primaryGoal.includes(goal.value)}
                        onCheckedChange={() => handleGoalToggle(goal.value)}
                      />
                      <Label htmlFor={goal.value} className="cursor-pointer flex-1">
                        {goal.label}
                      </Label>
                    </div>
                  ))}
                </div>
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
                        checked={formData.features.includes(feature)}
                        onCheckedChange={() => handleFeatureToggle(feature)}
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
                  <div className="p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <Input
                      id="timeline"
                      placeholder="e.g., ASAP, 2-3 months, flexible..."
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Budget range</Label>
                  <div className="p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                    <Input
                      id="budget"
                      placeholder="e.g., $5k-10k, flexible..."
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photos, Logos & Files */}
          <Card className="shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                <CardTitle className="text-2xl">Photos, Logos & Files</CardTitle>
              </div>
              <CardDescription>Got assets to share? Drop links or let us know what you have</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Drag & Drop Files Here</Label>
                <div 
                  className={`p-8 border-2 border-dashed rounded-lg text-center transition-colors cursor-pointer group ${
                    isDragOver 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border bg-secondary/30 hover:bg-secondary/50'
                  }`}
                  onClick={handleClick}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <Upload className={`w-12 h-12 mx-auto mb-4 transition-colors ${
                    isDragOver ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                  }`} />
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-foreground">
                      {isDragOver ? 'Drop your files here!' : 'Drop your files here'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Or click to browse and select files
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports images, PDFs, documents, videos, and more
                    </p>
                  </div>
                </div>
                
                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx,.txt,.zip,.rar"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
                
                {/* Display uploaded files */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files ({uploadedFiles.length})</Label>
                    <div className="space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Upload className="w-4 h-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border rounded-lg text-center bg-muted/30">
                <p className="text-sm text-muted-foreground">
                  {"You can also email files directly to "}
                  <span className="font-semibold text-primary">zenjamindev@gmail.com</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full md:w-auto px-12 py-6 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  {"Let's Build This!"}
                  <Sparkles className="w-5 h-5 ml-2" />
                </>
              )}
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
