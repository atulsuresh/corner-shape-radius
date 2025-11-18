"use client";

import { Slider } from "@blueprintjs/core";
import { useState } from "react";

const cornerTypesVarient = [
  {
    name: "Squircle",
    value: "squircle",
  },
  {
    name: "Round",
    value: "round",
  },
  {
    name: "Scoop",
    value: "scoop",
  },
  {
    name: "Bevel",
    value: "bevel",
  },
  {
    name: "Notch",
    value: "notch",
  },
  {
    name: "Square",
    value: "square",
  },

  {
    name: "Custom",
    value: "superellipse",
  },
];

const TypeSelection = ({ varient, onClick, isSelected }) => {
  return (
    <button
      className="cursor-pointer focus:outline-none hover:outline-none focus:ring-0 hover:ring-0"
      onClick={onClick}
    >
      <div
        style={{
          "corner-shape": "squircle",
        }}
        className={`h-32 w-full flex flex-col  bg-neutral-800 rounded-xl overflow-hidden duration-75 ${
          isSelected
            ? "outline-blue-500 outline-3"
            : "border-zinc-300 dark:border-neutral-700 hover:border-blue-500 border"
        }`}
      >
        <div className="h-full"></div>
        <div className="text-sm w-full font-bold px-2 py-2 border-t border-zinc-300 dark:border-neutral-700 bg-neutral-900">
          {varient.name}
        </div>
      </div>
    </button>
  );
};

const PreviewBlock = ({
  padding,
  borderRadius,
  selectedCornerType,
  superellipseRate,
}) => {
  let cornerType = selectedCornerType;
  if (selectedCornerType === "superellipse") {
    cornerType = `superellipse(${superellipseRate})`;
  }

  return (
    <div
      style={{
        padding: `${padding}px`,
        borderRadius: `${borderRadius}px`,
        "corner-shape": cornerType,
      }}
      className="bg-orange-500 overflow-hidden rounded-lg border border-orange-300 dark:border-orange-600 w-64 h-64 shadow-lg flex items-center justify-center"
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
      className="w-24 bg-neutral-800 rounded-lg border border-zinc-300 dark:border-neutral-700 p-2"
      value={value}
      onChange={onChange}
    />
  );
};

const CornerStyleSelectionPage = ({ children }) => {
  const [selectedCornerType, setSelectedCornerType] = useState(
    cornerTypesVarient[0].value
  );
  const [padding, setPadding] = useState(0);
  const [borderRadius, setBorderRadius] = useState(50);
  const [superellipseRate, setSuperellipseRate] = useState(0);
  return (
    <div className="flex w-full h-full items-center justify-center">
      <div className="w-full h-full bg-zinc-200 dark:bg-neutral-800  border-r border-zinc-300 dark:border-neutral-700">
        <div className="w-full h-full flex items-center justify-center">
          <PreviewBlock
            padding={padding}
            borderRadius={borderRadius}
            selectedCornerType={selectedCornerType}
            superellipseRate={superellipseRate}
          />
        </div>
      </div>

      <div className="h-full py-12 px-12">
        <div className="w-full">
          <div className="text-base font-bold mb-4">Corner Styles</div>
          <div className="grid grid-cols-4 gap-4 w-full">
            {cornerTypesVarient.map((varient) => (
              <TypeSelection
                key={varient.value}
                varient={varient}
                isSelected={selectedCornerType === varient.value}
                onClick={() => setSelectedCornerType(varient.value)}
              />
            ))}
          </div>
        </div>
        <div className="w-full mt-8 bg-neutral-800 rounded-lg border border-zinc-300 dark:border-neutral-700 p-4">
          <div className="flex  gap-12 w-full border-b border-zinc-300 dark:border-neutral-700 pb-4">
            <div className="w-32 font-bold">Border Radius</div>
            <div className="flex-1">
              <Slider
                value={borderRadius}
                max={180}
                min={0}
                step={1}
                labelStepSize={60}
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
            <div className="w-32 font-bold">Padding</div>
            <div className="flex-1">
              <Slider
                value={padding}
                max={100}
                min={0}
                step={1}
                labelStepSize={30}
                onChange={setPadding}
              />
            </div>
            <div>
              <SimpleInputBox
                value={padding}
                onChange={setPadding}
                type="number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CornerStyleSelectionPage;
