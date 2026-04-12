import {motion} from 'framer-motion';
import { div } from 'framer-motion/client';

export default function Loader(){
    return(
        <div className="flex justify-center items-center py-10">
            <motion.div 
            className="h-10 w-10 rounded-full border-2 border-white/20 border-t-white"
            animate={{rotate:360}}
            transition={{repeat:Infinity ,duration:0.8 , ease:"linear"}}
            />
        </div>
    )
}