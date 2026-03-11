import { useState, FormEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface ContactModalProps {
  children: React.ReactNode;
}

const ContactModal = ({ children }: ContactModalProps) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/send-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message || 'AI Vision inquiry',
          productType: 'SOHUB AI Vision'
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Thank you! We'll get back to you soon.");
        setForm({ name: "", phone: "", email: "", message: "" });
        setOpen(false);
      } else {
        toast.error('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-sohub-orange/50 transition-shadow";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sohub-orange/10 border border-sohub-orange/20 mb-4">
              <span className="w-2 h-2 rounded-full bg-sohub-orange animate-pulse" />
              <span className="text-xs font-medium text-sohub-orange uppercase tracking-wide">Get Started</span>
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Ready to deploy AI Vision?</h2>
            <p className="text-sm text-muted-foreground mb-6">Tell us about your requirements and we'll help you get started.</p>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            required
            placeholder="Your name"
            className={inputClass}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="tel"
            required
            placeholder="Phone number"
            className={inputClass}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email address (optional)"
            className={inputClass}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            placeholder="Tell us about your surveillance needs and location"
            rows={3}
            className={`${inputClass} resize-none`}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-sohub-orange hover:bg-sohub-orange/90 text-white font-medium py-4 px-6 rounded-xl transition-colors flex items-center justify-center group"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              <>
                Get Started
                <Send size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;