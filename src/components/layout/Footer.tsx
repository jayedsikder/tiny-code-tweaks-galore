
export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 gradient-card"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      {/* Floating decoration elements */}
      <div className="absolute top-4 left-10 w-2 h-2 bg-primary/30 rounded-full animate-pulse"></div>
      <div className="absolute top-6 right-20 w-1 h-1 bg-accent/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-4 left-1/3 w-1.5 h-1.5 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 py-8 text-center relative z-10">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 gradient-primary"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <div className="h-px w-12 gradient-accent"></div>
          </div>
          
          <p className="text-muted-foreground text-lg font-medium">
            &copy; {new Date().getFullYear()} 
            <span className="text-gradient-primary font-semibold mx-2">CommerceFlow</span>
            All rights reserved.
          </p>
          
          <p className="text-sm text-muted-foreground/80 flex items-center justify-center gap-2">
            Powered by 
            <span className="font-semibold text-gradient-accent">Next.js</span>
            &
            <span className="font-semibold text-gradient-primary">Firebase</span>
          </p>
          
          <div className="flex items-center justify-center gap-1 mt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.3}s` }}></div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
