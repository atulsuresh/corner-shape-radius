"use client";

import { Slider } from "@blueprintjs/core";
import Image from "next/image";
import { useState, useEffect } from "react";

import generateCornerClipPath from "./generateCornerClipPath";
//round | scoop | bevel | notch | squircle;
const cornerTypesVarient = [
  {
    name: "Squircle",
    value: "squircle",
    thumbnail: "/corner-shape-icons/squrical.png",
  },
  {
    name: "Round",
    value: "round",
    thumbnail: "/corner-shape-icons/round.png",
  },
  {
    name: "Scoop",
    value: "scoop",
    thumbnail: "/corner-shape-icons/scoop.png",
  },
  {
    name: "Bevel",
    value: "bevel",
    thumbnail: "/corner-shape-icons/bevel.png",
  },
  {
    name: "Notch",
    value: "notch",
    thumbnail: "/corner-shape-icons/notch.png",
  },
  // {
  //   name: "Square",
  //   value: "square",
  //   thumbnail: "/corner-shape-icons/square.png",
  // },

  {
    name: "Custom",
    value: "superellipse",
    thumbnail: "/corner-shape-icons/squrical.svg",
  },
];

const CodeDisplay = ({
  selectedCornerType,
  borderRadius,
  padding,
  superellipseRate,
  previewBoxWidth,
  previewBoxHeight,
}) => {
  let cornerType = selectedCornerType;
  if (selectedCornerType === "superellipse") {
    cornerType = `superellipse(${superellipseRate / 10})`;
  }
  return (
    <div className=" w-full">
      <div className="dark:bg-neutral-800 bg-zinc-100 w-full rounded-lg border border-zinc-300 dark:border-neutral-700">
        <div className="px-4 py-2 border-b border-zinc-300 dark:border-neutral-700 font-bold">
          CSS Code
        </div>
        <pre className="w-full px-4 py-4 font-mono text-sm">
          {`.border-corner-shape-${selectedCornerType} {
  corner-shape: ${cornerType};
  border-radius: ${borderRadius}px;
  padding: ${padding}px;
  width: ${previewBoxWidth}px;
  height: ${previewBoxHeight}px;
}`}
        </pre>
      </div>
    </div>
  );
};

const TypeSelection = ({
  varient,
  onClick,
  isSelected,
  borderRadius,
  superellipseRate,
}) => {
  let cornerType = varient.value;
  if (varient.value == "superellipse") {
    cornerType = `superellipse(${superellipseRate / 10})`;
  }
  return (
    <button
      className={` w-full flex flex-col overflow-hidden cursor-pointer  dark:bg-neutral-800 bg-zinc-100 rounded-xl duration-75 ${
        isSelected
          ? "outline-blue-500 outline-3"
          : "border-zinc-300 dark:border-neutral-700  hover:border-blue-500 border"
      }`}
      onClick={onClick}
    >
      <div className="flex-1 flex items-center justify-center rounded-t-xl min-h-[120px] bg-zinc-200 dark:bg-neutral-800">
        {/* <Image
            src={varient.thumbnail}
            alt={varient.name}
            width={180}
            height={100}
            className="h-full max-h-[160px] object-cover"
          /> */}
        <div
          className={`w-[70px] h-[70px] corner-shape-${varient.value} ${
            varient.value == "superellipse"
              ? "bg-zinc-600 dark:bg-neutral-600"
              : "bg-zinc-600 dark:bg-neutral-600"
          }`}
          style={{
            "corner-shape": cornerType,
            borderRadius: `calc(var(--border-radius) * 0.2)`,
          }}
        ></div>
      </div>
      <div className="text-base w-full font-bold px-2 py-2 border-t rounded-b-xl border-zinc-300 dark:border-neutral-700 bg-neutral-200 dark:bg-neutral-600">
        {varient.name}
      </div>
    </button>
  );
};

const PreviewBlock = ({
  padding,
  borderRadius,
  selectedCornerType,
  superellipseRate,
  previewBoxWidth,
  previewBoxHeight,
}) => {
  let cornerType = selectedCornerType;
  if (selectedCornerType === "superellipse") {
    cornerType = `superellipse(${superellipseRate / 10})`;
  }

  return (
    <div
      style={{
        padding: `${padding}px`,
        borderRadius: `${borderRadius}px`,
        "corner-shape": cornerType,
        width: `${previewBoxWidth}px`,
        height: `${previewBoxHeight}px`,
      }}
      className="bg-orange-500 overflow-hidden rounded-lg border border-orange-300 dark:border-orange-600 shadow-lg flex items-center justify-center"
    >
      <div className="text-3xl font-bold text-center rounded-sm w-full h-full flex items-center justify-center bg-orange-500 dark:bg-orange-600">
        <div contentEditable="true" className="text-lg font-bold text-center">
          This is a {selectedCornerType} corner.
        </div>
      </div>
    </div>
  );
};

const SimpleInputBox = ({ value, onChange, type }) => {
  return (
    <input
      type={type}
      className="w-24 dark:bg-neutral-800 bg-white font-bold rounded-lg border border-zinc-300 dark:border-neutral-700 p-2"
      value={value}
      onChange={onChange}
    />
  );
};

const isUnsupportedBrowser = () => {
  if (typeof window === "undefined") return false;

  const userAgent = window.navigator.userAgent.toLowerCase();
  const isSafari =
    /safari/.test(userAgent) &&
    !/chrome/.test(userAgent) &&
    !/chromium/.test(userAgent);
  const isFirefox = /firefox/.test(userAgent);

  return isSafari || isFirefox;
};

const CornerStyleSelectionPage = () => {
  const [selectedCornerType, setSelectedCornerType] = useState(
    cornerTypesVarient[0].value
  );
  const [padding, setPadding] = useState(0);
  const [borderRadius, setBorderRadius] = useState(90);
  const [superellipseRate, setSuperellipseRate] = useState(0);
  const [isUnsupported, setIsUnsupported] = useState(false);
  const [previewBoxWidth, setPreviewBoxWidth] = useState(300);
  const [previewBoxHeight, setPreviewBoxHeight] = useState(300);

  const [fallBackClipPath, setFallBackClipPath] = useState(
    generateCornerClipPath({
      width: previewBoxWidth,
      height: previewBoxHeight,
      radius: borderRadius,
      shape: selectedCornerType,
    })
  );

  useEffect(() => {
    if (selectedCornerType == "superellipse") {
      return;
    }
    setFallBackClipPath(
      generateCornerClipPath({
        width: previewBoxWidth,
        height: previewBoxHeight,
        radius: borderRadius,
        shape: selectedCornerType,
      })
    );
  }, [previewBoxWidth, previewBoxHeight, borderRadius]);

  useEffect(() => {
    setIsUnsupported(isUnsupportedBrowser());
  }, []);

  useEffect(() => {
    if (selectedCornerType == "superellipse") {
      return;
    }
    const root = document.documentElement;
    root.style.setProperty("--padding", `${padding}px`);
    root.style.setProperty("--border-radius", `${borderRadius}px`);
    root.style.setProperty("--preview-box-width", `${previewBoxWidth}px`);
    root.style.setProperty("--preview-box-height", `${previewBoxHeight}px`);
    root.style.setProperty("--fallback-clip-path", fallBackClipPath);
  }, [
    padding,
    borderRadius,
    previewBoxWidth,
    previewBoxHeight,
    fallBackClipPath,
  ]);

  return (
    <>
      <div className="grid grid-cols-12 w-full relative border-b border-zinc-300 dark:border-neutral-900">
        <div className="w-full col-span-7 h-[calc(100vh-64px)] sticky top-0  bg-zinc-50 dark:bg-neutral-800  border-r border-zinc-200 dark:border-neutral-700">
          <div className="w-full h-full flex items-center justify-center">
            <PreviewBlock
              previewBoxWidth={previewBoxWidth}
              previewBoxHeight={previewBoxHeight}
              padding={padding}
              borderRadius={borderRadius}
              selectedCornerType={selectedCornerType}
              superellipseRate={superellipseRate}
            />
          </div>
        </div>

        <div className=" pt-4 col-span-5 flex flex-col">
          <div className="w-full  px-12">
            {isUnsupported && (
              <>
                <div className="mb-8 bg-yellow-800 dark:bg-yellow-800 text-black dark:text-white px-6 py-4 rounded-lg shadow-lg  max-w-2xl">
                  <div className="font-bold text-lg mb-2">
                    ⚠️ Browser Not Supported
                  </div>
                  <div className="text-sm font-bold">
                    The{" "}
                    <code className="bg-black/20 px-1 rounded">
                      corner-shape
                    </code>{" "}
                    CSS property is not yet supported in Safari or Firefox.
                    Please use Chrome, Edge, or another Chromium-based browser
                    to see the corner shapes in action.
                    <div className="mt-2 text-blue-400">
                      <a
                        href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/corner-shape#browser_compatibility"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:no-underline text-blue-300 hover:text-blue-600"
                      >
                        View browser compatibility →
                      </a>
                    </div>
                  </div>
                </div>
                {/* <div className="h-12"></div> */}
              </>
            )}

            <div className="text-base font-bold mb-4">Corner Styles</div>
            <div className="grid grid-cols-4 gap-4 w-full">
              {cornerTypesVarient.map((varient) => (
                <TypeSelection
                  key={varient.value}
                  varient={varient}
                  borderRadius={borderRadius}
                  superellipseRate={superellipseRate}
                  isSelected={selectedCornerType === varient.value}
                  onClick={() => setSelectedCornerType(varient.value)}
                />
              ))}
            </div>
          </div>
          <div className="w-full px-8">
            <div className="w-full mt-8 dark:bg-neutral-800 bg-zinc-100 rounded-lg border border-zinc-300 dark:border-neutral-700 p-4">
              <div className="flex  gap-12 w-full border-b border-zinc-300 dark:border-neutral-700 pb-4">
                <div className="w-32 font-bold text-gray-900 dark:text-zinc-200">
                  Border Radius
                </div>
                <div className="flex-1">
                  <Slider
                    value={borderRadius}
                    max={
                      previewBoxWidth > previewBoxHeight
                        ? previewBoxWidth / 2
                        : previewBoxHeight / 2
                    }
                    min={0}
                    step={1}
                    labelStepSize={
                      (previewBoxWidth > previewBoxHeight
                        ? previewBoxWidth / 2
                        : previewBoxHeight / 2) / 5
                    }
                    onChange={setBorderRadius}
                  />
                </div>
                <div>
                  {/* <input
                type="number"
                className="w-24 bg-neutral-800 rounded-lg border border-zinc-300 dark:border-neutral-700 p-2"
                value={borderRadius}
                onChange={(e) => setBorderRadius(e.target.value)}
              /> */}
                  <SimpleInputBox
                    value={borderRadius}
                    onChange={setBorderRadius}
                    type="number"
                  />
                </div>
              </div>
              {selectedCornerType === "superellipse" && (
                <div className="flex  gap-12 w-full mt-4 border-b pb-4 border-zinc-300 dark:border-neutral-700">
                  <div className="w-32 font-bold">Superellipse Rate</div>
                  <div className="flex-1">
                    <Slider
                      value={superellipseRate}
                      max={3}
                      min={-3}
                      step={0.5}
                      labelStepSize={1}
                      onChange={setSuperellipseRate}
                    />
                  </div>
                  <div>
                    <SimpleInputBox
                      value={superellipseRate / 10}
                      onChange={setSuperellipseRate}
                      type="number"
                    />
                  </div>
                </div>
              )}
              <div className="flex  gap-12 w-full mt-4">
                <div className="w-32 font-bold">Preview Box Width</div>
                <div className="flex-1">
                  <Slider
                    value={previewBoxWidth}
                    max={500}
                    min={0}
                    step={1}
                    labelStepSize={500 / 5}
                    onChange={setPreviewBoxWidth}
                  />
                </div>
                <div>
                  <SimpleInputBox
                    value={previewBoxWidth}
                    onChange={setPreviewBoxWidth}
                    type="number"
                  />
                </div>
              </div>
              <div className="flex  gap-12 w-full mt-6">
                <div className="w-32 font-bold">Preview Box Height</div>
                <div className="flex-1">
                  <Slider
                    value={previewBoxHeight}
                    max={500}
                    min={0}
                    step={1}
                    labelStepSize={500 / 5}
                    onChange={setPreviewBoxHeight}
                  />
                </div>
                <div>
                  <SimpleInputBox
                    value={previewBoxHeight}
                    onChange={setPreviewBoxHeight}
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex flex-col ">
            <div className="p-8">
              <CodeDisplay
                previewBoxWidth={previewBoxWidth}
                previewBoxHeight={previewBoxHeight}
                selectedCornerType={selectedCornerType}
                borderRadius={borderRadius}
                padding={padding}
                superellipseRate={superellipseRate}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="h-[400px]">asdasda</div> */}
    </>
  );
};

export default CornerStyleSelectionPage;
