import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export function FAQ() {
    return (
        <section id="faq">
            <div>
                <h2 className="text-center font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full">
                    FAQ
                </h2>
                <p className='font-normal text-dimWhite text-[18px] leading-[30.8px] text-center mt-5'>
					Placeholder text, change before shipping.
				</p>
            </div>
            <Accordion type="multiple">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="font-semibold font-mono text-white text-xl">What is Evelyn?</AccordionTrigger>
                    <AccordionContent className="font-normal font-mono text-white">
                        Lorem ipsum dis hamet alea alea.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="font-semibold font-mono text-white text-xl">Can I host Evelyn myself?</AccordionTrigger>
                    <AccordionContent className="font-normal font-mono text-white">
                        Lorem ipsum dis hamet alea alea.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="font-semibold font-mono text-white text-xl">What is Evelyn?</AccordionTrigger>
                    <AccordionContent className="font-normal font-mono text-white">
                        Lorem ipsum dis hamet alea alea.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger className="font-semibold font-mono text-white text-xl">What is Evelyn?</AccordionTrigger>
                    <AccordionContent className="font-normal font-mono text-white">
                        Lorem ipsum dis hamet alea alea.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger className="font-semibold font-mono text-white text-xl">What is Evelyn?</AccordionTrigger>
                    <AccordionContent className="font-normal font-mono text-white">
                        Lorem ipsum dis hamet alea alea.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                    <AccordionTrigger className="font-semibold font-mono text-white text-xl">What is Evelyn?</AccordionTrigger>
                    <AccordionContent className="font-normal font-mono text-white">
                        Lorem ipsum dis hamet alea alea.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </section>
    )
}