import { motion, AnimatePresence } from 'motion/react';
import { X, Coffee } from 'lucide-react';
import kakaopayImg from '../../assets/images/kakaopay.JPG';

interface BuyCoffeeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function BuyCoffeeModal({ isOpen, onClose }: BuyCoffeeModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-card text-card-foreground p-8 rounded-3xl shadow-2xl max-w-sm w-full relative z-10 text-center border border-amber-100/20"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors z-20"
                        >
                            <X size={20} />
                        </button>

                        <div className="w-16 h-16 bg-[#FEE500] text-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-amber-400/20">
                            <Coffee size={28} strokeWidth={2} />
                        </div>

                        <h3 className="text-2xl font-bold mb-2">Coffee Break!</h3>
                        <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                            콘텐츠가 유용하셨다면,<br />
                            따뜻한 커피 한 잔 응원 부탁이요! ☕️
                        </p>

                        <div className="bg-white p-6 rounded-2xl mb-6 shadow-inner border border-gray-100">
                            <img
                                src={kakaopayImg}
                                alt="KakaoPay QR Code"
                                className="w-full h-auto object-contain mix-blend-multiply rounded-lg"
                            />
                        </div>

                        <a
                            href="https://qr.kakaopay.com/Ej8lhfFWG"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-full py-3 bg-[#FEE500] hover:bg-[#FDD835] text-black/90 rounded-xl font-bold hover:translate-y-[-1px] transition-all shadow-md shadow-amber-400/10"
                        >
                            카카오페이 바로가기
                        </a>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
