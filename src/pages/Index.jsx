import React, { useRef, useState } from "react";
import { Box, Flex, IconButton, VStack } from "@chakra-ui/react";
import { FaCircle } from "react-icons/fa";

const colors = ["#FF0000", "#FFFF00", "#0000FF", "#FFFFFF", "#000000"];
const brushSizes = [5, 10, 15, 20, 25];

const Index = () => {
  const canvasRef = useRef(null);
  const [activeColor, setActiveColor] = useState("#000000");
  const [activeBrushSize, setActiveBrushSize] = useState(5);
  const [isDrawing, setIsDrawing] = useState(false);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = activeColor;
    context.lineWidth = activeBrushSize;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current.getContext("2d");
    context.closePath();
    setIsDrawing(false);
  };

  return (
    <Box position="relative" height="100vh" width="100vw">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ display: "block" }}
      />
      <Flex
        position="absolute"
        bottom={0}
        width="100%"
        bg="rgba(255, 255, 255, 0.8)"
        p={2}
        justifyContent="center"
        alignItems="center"
      >
        <VStack spacing={2} mr={4}>
          {colors.map((color) => (
            <IconButton
              key={color}
              aria-label={color}
              icon={<FaCircle color={color} />}
              size="lg"
              isRound
              variant={activeColor === color ? "solid" : "outline"}
              onClick={() => setActiveColor(color)}
            />
          ))}
        </VStack>
        <VStack spacing={2}>
          {brushSizes.map((size) => (
            <IconButton
              key={size}
              aria-label={`Brush size ${size}`}
              icon={<FaCircle size={size} />}
              size="lg"
              isRound
              variant={activeBrushSize === size ? "solid" : "outline"}
              onClick={() => setActiveBrushSize(size)}
            />
          ))}
        </VStack>
      </Flex>
    </Box>
  );
};

export default Index;