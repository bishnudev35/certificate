import React, { useState, useCallback, useRef } from "react";
import { toPng } from 'html-to-image';
import './certificate.css'
import certificateTemplate from './certificate.png'

const Certificate = () => {
    const ref = useRef(null);
    const [name, setName] = useState('');

    const onButtonClick = useCallback(() => {
        if (ref.current === null) {
            return;
        }

        toPng(ref.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement('a');
                link.download = 'my-certificate.png';
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    }, [ref]);

    return (
        <div className="text-black absolute" style={{margin:"0px",padding:"0px"}}>
            <input className="m-9 absolute rounded-lg" style={{border:"2px solid black"}} type='text' placeholder='enter name' value={name} onChange={(e) => setName(e.target.value)} />
            <div className="size-1/2 m-64 mt-16 " ref={ref} style={{position:"absolute",  height:"600px", width:"600px", top:"50px" }}>

                <div style={{ textAlign: "center",  }}>
                    <img src={certificateTemplate} height={400} style={{ display: "inline-block" }} />
                </div>
                
                <div className="conti text-xl font-medium" style={{ position:"relative", top:"-239px", bottom:"51px", left:"273px" }}>
                   
                    <h1 className="mb-10">{name}</h1>
                </div>
            </div>
            <button  style={{ position:"relative", bottom:"-600px",left:"573px"}} className="bg-gray-700 rounded-xl p-3 flex justify-center" onClick={onButtonClick}>Click me</button>
        </div>
    );
}

export default Certificate;
