import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

import macImg from '../../assets/images/Macbook.webp';
import ipadImg from '../../assets/images/ipadpro.webp';
import iphoneImg from '../../assets/images/iphone.webp';
import airpodsImg from '../../assets/images/airpod-max.webp';
import keyboardImg from '../../assets/images/typing_keyboard.webp';
import newsBellImg from '../../assets/images/news_bell.webp';
import newsRobotImg from '../../assets/images/news_robot.webp';

interface FloatingDeviceProps {
    type: 'mac' | 'ipad' | 'iphone' | 'airpods' | 'keyboard' | 'newsbell' | 'newsrobot';
    position?: 'left' | 'right' | 'center';
    offsetY?: number;
}

export function FloatingDevice({ type, position, offsetY = 0 }: FloatingDeviceProps) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Blur effect: starts blurred, clears as it slides in
    const blur = useTransform(scrollYProgress, [0, 0.4], [8, 0]);

    let src = '';
    let widthClass = '';
    let animationStyle: Record<string, unknown> = {};
    let containerClass = 'justify-center';

    switch (type) {
        case 'mac':
            src = macImg;
            widthClass = 'w-[600px] md:w-[900px]';
            containerClass = 'justify-start'; // Align Left
            // Slide from Left
            const xMac = useTransform(scrollYProgress, [0, 0.5], ["-50%", "10%"]);
            animationStyle = { x: xMac };
            break;

        case 'ipad':
            src = ipadImg;
            widthClass = 'w-[400px] md:w-[600px]';
            containerClass = 'justify-end'; // Align Right
            // Slide from Right
            const xIpad = useTransform(scrollYProgress, [0, 0.5], ["50%", "-10%"]);
            animationStyle = { x: xIpad };
            break;

        case 'iphone':
            src = iphoneImg;
            widthClass = 'w-[300px] md:w-[500px]';
            containerClass = 'justify-start'; // Align Left (Changed from center/pop)
            // Slide from Left
            const xPhone = useTransform(scrollYProgress, [0, 0.5], ["-50%", "15%"]);
            animationStyle = { x: xPhone };
            break;

        case 'airpods':
            src = airpodsImg;
            widthClass = 'w-[350px] md:w-[600px]';
            containerClass = 'justify-end'; // Align Right (Changed from center/pop)
            // Slide from Right
            const xPods = useTransform(scrollYProgress, [0, 0.5], ["50%", "-15%"]);
            animationStyle = { x: xPods };
            break;

        case 'keyboard':
            src = keyboardImg;
            widthClass = 'w-[400px] md:w-[550px] lg:w-[800px]'; // Smaller on tablet to prevent text overlap
            containerClass = 'justify-end'; // Align Right
            // Slide from Right - more dramatic entrance
            const xKeyboard = useTransform(scrollYProgress, [0, 0.6], ["80%", "-5%"]);
            animationStyle = { x: xKeyboard };
            break;

        case 'newsbell':
            src = newsBellImg;
            widthClass = 'w-[280px] md:w-[420px]'; // 70% of 400/600
            containerClass = 'justify-end'; // Align Right
            // Slide from Right to middle
            const xBell = useTransform(scrollYProgress, [0, 0.6], ["90%", "-50%"]);
            animationStyle = { x: xBell };
            break;

        case 'newsrobot':
            src = newsRobotImg;
            widthClass = 'w-[280px] md:w-[420px]'; // 70% of 400/600
            containerClass = 'justify-start'; // Align Left
            // Slide from Left to middle
            const xRobot = useTransform(scrollYProgress, [0, 0.6], ["-90%", "50%"]);
            animationStyle = { x: xRobot };
            break;
    }

    return (
        <div ref={ref} className={`absolute w-full pointer-events-none z-20 flex items-center ${containerClass} overflow-visible`} style={{ top: offsetY ? `${offsetY}px` : 'auto' }}>
            <motion.div
                style={{
                    ...animationStyle,
                    filter: useTransform(blur, (v) => `blur(${v}px)`)
                }}
                className={`${widthClass} relative flex shrink-0`}
            >
                <motion.img
                    src={src}
                    alt=""
                    className="w-full h-auto drop-shadow-2xl object-contain"
                    animate={{ y: [0, -15, 0] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.div>
        </div>
    );
}
