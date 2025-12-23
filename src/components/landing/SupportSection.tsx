import { motion } from 'motion/react';
import { Coffee } from 'lucide-react';
import kakaopayImg from '../../assets/images/kakaopay.JPG';

export function SupportSection() {
    return (
        <section className="py-24 bg-background border-t border-border/40">
            <div className="max-w-2xl mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center gap-6"
                >
                    <div className="w-16 h-16 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-500">
                        <Coffee size={32} strokeWidth={1.5} />
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-2xl font-bold tracking-tight">
                            Coffee Break
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            콘텐츠가 유용하셨다면, 따뜻한 커피 한 잔은 어떠신가요?<br />
                            여러분의 작은 응원이 더 좋은 이야기를 만드는 큰 힘이 됩니다.
                        </p>
                    </div>

                    <div className="flex flex-col items-center gap-4 mt-6">
                        <div className="p-4 bg-white rounded-3xl shadow-2xl shadow-amber-500/10 border border-amber-100/50 transform hover:scale-105 transition-transform duration-300">
                            <img
                                src={kakaopayImg}
                                alt="KakaoPay Support QR"
                                className="w-[200px] h-auto rounded-xl mix-blend-multiply"
                            />
                        </div>
                        <p className="text-sm text-muted-foreground font-medium flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-full">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            카카오페이로 스캔하여 후원하기
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
