type FrameProps = {
    fileUrls : string[],
    setCurrentFrame : React.Dispatch<React.SetStateAction<number>>
}

export const Frame = ({fileUrls, setCurrentFrame} : FrameProps) => {
    const handleNext = () => setCurrentFrame((prev) => (prev + 1) % fileUrls.length);
    
    const handlePrev = () => setCurrentFrame((prev) => (prev - 1 + fileUrls.length) % fileUrls.length);

    return (
        <div style={{ marginTop: 10 }}>
            <button onClick={handlePrev}>Prev</button>
            <button onClick={handleNext} style={{ marginLeft: 10 }}>Next</button>
        </div>
    );
};