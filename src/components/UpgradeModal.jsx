"use client";

import { AlertCircle } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { PricingSection } from "./PricingSection";

export function UpgradeModal({ open, onOpenChange, reason }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="border-amber-200/10 min-w-[70vw] max-h-[90vh] overflow-y-scroll">
                <DialogHeader>
                    <div className="flex items-start gap-2 mb-2">
                        <AlertCircle className="text-amber-400 ml-2 mt-1" />
                        <div>
                            <DialogTitle className="font-serif text-2xl">
                                Upgrade Your Plan
                            </DialogTitle>
                            {reason && (
                                <DialogDescription className="text-amber-400 mt-1">
                                    {reason}
                                </DialogDescription>
                            )}
                        </div>
                    </div>
                </DialogHeader>
                <div className="px-2 pb-6">
                    <PricingSection />
                </div>
            </DialogContent>
        </Dialog>
    );
}
