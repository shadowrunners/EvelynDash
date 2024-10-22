'use client';

import { Card, CardHeader, CardFooter, CardContent, Button } from "./";
import { useEffect, useState } from "react";
import { MdCookie } from "react-icons/md";

export default function CookieConsent() {
  // a dev is probably gonna look at this and say it's absolutely ass
  // but hey, what works, works
  const [hasConsented, setConsent] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasConsented = localStorage.getItem('hasConsentedtoCookies');
    if (hasConsented) setConsent(true);
    setLoading(false);
  }, []);

  if (hasConsented) return null;

  const handleConsent = () => {
    localStorage.setItem('hasConsentedtoCookies', 'true');
    setConsent(true);
  };
  
  return ( 
    <div className={`${loading ? 'hidden' : ''} fixed bottom-0 right-0 z-50 m-5 w-[500px] max-w-[90%] md:w-[500px]`}>
      <Card className='bg-black/50 backdrop-blur-md text-white rounded-xl font-sans'>
        <CardHeader className="font-semibold flex-row flex items-center">
          <span className="w-[40px] h-[40px] rounded-full flex justify-center items-center bg-dimBlue">
            <MdCookie className="w-6 h-6" />
          </span>
          <p className="ml-2">Yes, we're baking cookies.</p>
        </CardHeader>
        <CardContent className="ml-2 mr-2 text-dimWhite">
          Our website requires cookies for two reasons to determine what language we're delivering to you and to keep you signed in otherwise you'd be standing in the void right now and we'd have no idea whether you're signed in or not.
        </CardContent>
        <CardFooter>
            <Button onClick={handleConsent}>I agree</Button>
          </CardFooter>
        </Card>
      </div>
    );
}