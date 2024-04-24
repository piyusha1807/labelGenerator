"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { HotTable } from "@handsontable/react";
import { registerAllModules } from "handsontable/registry";
import "handsontable/dist/handsontable.full.min.css";
import data from "./data.json";
import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";
import Editor from "@/components/common/Editor";
registerAllModules();

export default function Home() {
  const [pageType, setPageType] = useState("");
  const [pageLayout, setPageLayout] = useState({
    width: "100px",
    height: "200px",
    marginTop: "10px",
    marginBottom: "0px",
    marginLeft: "0px",
    marginRight: "0px",
    labelWidth: "100px",
    labelHeight: "200px",
  });
  const [config, setConfig] = useState({
    title: {
      size: 10,
      boldness: "bold",
      line: 1,
      alignment: "center",
    },
    description: {
      size: 10,
      boldness: "bold",
      line: 1,
      alignment: "start",
    },
    barCode: {},
    barText: {
      size: 10,
      boldness: "bold",
      line: 1,
      alignment: "start",
    },
  });

  const handleConfig = (key, subKey, value) => {
    setConfig({
      ...config,
      [key]: {
        ...config[key],
        [subKey]: value,
      },
    });
  };

  return (
    <main className="flex">
      <div className="w-6/12 p-4">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          1. Types of paper
        </h4>
        <RadioGroup
          defaultValue="option-one"
          className="flex items-center space-x-4 text-sm"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="label-sheet" id="label-sheet" />
            <Label htmlFor="label-sheet">Label sheet</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="thermal-label" id="thermal-label" />
            <Label htmlFor="thermal-label">Thermal label</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="custom" id="custom" />
            <Label htmlFor="custom">Custom</Label>
          </div>
        </RadioGroup>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <Label htmlFor="width">Width</Label>
            <Input id="width" type="number" className="max-w-20" />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="height">Height</Label>
            <Input id="height" type="number" className="max-w-20" />
          </div>
        </div>

        <h4 className="text-xl font-semibold tracking-tight">
          2. Label design
        </h4>

        <Editor
          title="Title"
          keyName="title"
          data={config?.title}
          onConfig={handleConfig}
        />
        <Editor
          title="Description"
          keyName="description"
          data={config?.description}
          onConfig={handleConfig}
        />
        <Editor
          title="Barcode Text"
          keyName="barText"
          data={config?.barText}
          onConfig={handleConfig}
        />

        <HotTable
          data={[
            ["", "Tesla", "Volvo", "Toyota", "Ford"],
            ["2019", 10, 11, 12, 13],
            ["2020", 20, 11, 14, 13],
            ["2021", 30, 15, 12, 13],
          ]}
          rowHeaders={true}
          colHeaders={true}
          height="auto"
          autoWrapRow={true}
          autoWrapCol={true}
          licenseKey="non-commercial-and-evaluation" // for non-commercial use only
        />

        <Button>Print</Button>
      </div>
      <div className="w-6/12 h-screen bg-slate-200 grid place-items-center">
        <div
          className="bg-white"
          style={{
            width: pageLayout?.width,
            height: pageLayout?.height,
            padding: `${pageLayout?.marginTop} ${pageLayout?.marginRight} ${pageLayout?.marginBottom} ${pageLayout?.marginLeft}`,
          }}
        >
          {data.map(({ title, description, code }, idx) => {
            return (
              <div
                key={idx}
                className="border border-1 border-gray-300"
                style={{
                  width: pageLayout?.labelWidth,
                  height: pageLayout?.labelHeight,
                }}
              >
                <p
                  className={`overflow-hidden overflow-ellipsis ${
                    config.title.boldness === "bold" ? "font-bold" : ""
                  }`}
                  style={{
                    fontSize: `${config.title.size}px`,
                    textAlign: config.title.alignment,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: config.title.line,
                  }}
                >
                  {title}
                </p>
                <p
                  className={`overflow-hidden overflow-ellipsis ${
                    config.description.boldness === "bold" ? "font-bold" : ""
                  }`}
                  style={{
                    fontSize: `${config.description.size}px`,
                    textAlign: config.description.alignment,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: config.description.line,
                  }}
                >
                  {description}
                </p>
                <p
                  className={`overflow-hidden overflow-ellipsis ${
                    config.barText.boldness === "bold" ? "font-bold" : ""
                  }`}
                  style={{
                    fontSize: `${config.barText.size}px`,
                    textAlign: config.barText.alignment,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: config.barText.line,
                  }}
                >
                  {code}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
