import { Heart, Brain, Users, Zap, Award, Target, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";

const About = () => {
  const navigate = useNavigate();
  const teamMembers = [
    {
      name: "Ravi Kumar",
      role: "Founder & CEO",
      bio: "Passionate about intelligent shopping and making deals accessible to everyone through AI innovation.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      skills: ["AI Strategy", "Product Vision", "Leadership"]
    },
    {
      name: "Sneha Patel",
      role: "AI Lead",
      bio: "Loves merging AI with daily life to create meaningful experiences that save time and money.",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      skills: ["Machine Learning", "Computer Vision", "NLP"]
    },
    {
      name: "Arjun Mehta",
      role: "Tech Lead",
      bio: "Building scalable systems that can handle millions of products and deliver results in milliseconds.",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      skills: ["Backend Architecture", "APIs", "Performance"]
    },
    {
      name: "Priya Singh",
      role: "Product Designer",
      bio: "Crafting beautiful, intuitive experiences that make complex AI technology feel simple and delightful.",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      skills: ["UX Design", "UI Design", "User Research"]
    }
  ];

  const techStack = [
    { name: "GPT-4", description: "Advanced language understanding" },
    { name: "CLIP", description: "Image recognition & analysis" },
    { name: "Amazon API", description: "Real-time product data" },
    { name: "Flipkart API", description: "Price comparison" },
    { name: "React", description: "Modern web interface" },
    { name: "Node.js", description: "Scalable backend" }
  ];

  const values = [
    {
      icon: Target,
      title: "Accuracy First",
      description: "Our AI is constantly learning to provide the most accurate product matches and price comparisons."
    },
    {
      icon: Shield,
      title: "Privacy Focused",
      description: "Your searches and preferences are kept private. We never sell your personal data."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results in under 3 seconds. We've optimized every aspect for speed and efficiency."
    },
    {
      icon: Heart,
      title: "User Centric",
      description: "Every feature is designed with our users in mind. Your feedback shapes our product development."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <section className="py-20 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Our Story</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Built to Help You <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Organize Smarter</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We believe everyone deserves a well-organized, clutter-free space without the stress of figuring out what to buy. 
            Our AI-powered platform analyzes your space problems and finds the perfect organization solutions.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            To revolutionize space organization by leveraging artificial intelligence. We're on a mission to eliminate 
            the frustration of cluttered spaces and endless product searches, making smart organization solutions accessible 
            to everyone with just a simple photo upload or problem description.
          </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4">
            <div className="text-3xl font-bold text-primary mb-1">2.5M+</div>
            <div className="text-sm text-muted-foreground">Problems Solved</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-accent mb-1">₹50Cr+</div>
            <div className="text-sm text-muted-foreground">Money Saved</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-primary-glow mb-1">100K+</div>
            <div className="text-sm text-muted-foreground">Organized Spaces</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-success mb-1">99.2%</div>
            <div className="text-sm text-muted-foreground">Problem Detection Rate</div>
          </div>
              </div>
            </div>
            <Card className="card-gradient p-8">
              <Brain className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-xl font-semibold mb-4">What Makes Us Unique</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">AI-Powered Problem Detection:</strong> Upload any space photo and our AI instantly identifies organization issues and clutter problems
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Smart Solution Matching:</strong> We find the perfect organization products across Amazon, Flipkart, and more
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary-glow rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">
                    <strong className="text-foreground">Natural Problem Description:</strong> Describe your space challenges in your own words and get perfect solutions
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="card-soft p-6 text-center hover:scale-105 transition-all duration-300">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold mb-3">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The passionate individuals building the future of intelligent space organization
          </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="card-gradient p-6 text-center hover:scale-105 transition-all duration-300">
                <div className="relative mb-6">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground text-xs">
                      Team Member
                    </Badge>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{member.bio}</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {member.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Technology</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powered by cutting-edge AI and modern web technologies
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <Card key={index} className="card-soft p-4 text-center hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{tech.name.charAt(0)}</span>
                </div>
                <h4 className="font-semibold text-sm mb-1">{tech.name}</h4>
                <p className="text-xs text-muted-foreground">{tech.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="card-gradient p-12 text-center">
            <Users className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're constantly improving and would love to hear from you. Your feedback helps us build 
              a better platform for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate("/feedback")}
                className="btn-hero-primary"
              >
                Share Your Feedback
              </Button>
              <Button 
                onClick={() => navigate("/")}
                variant="outline"
                className="px-8"
              >
                Try Our Platform
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;