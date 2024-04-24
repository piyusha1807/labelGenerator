import React from "react";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
} from "@radix-ui/react-icons";

const Editor = ({ title, keyName, data, onConfig }) => {
  return (
    <div>
      <small className="text-sm font-medium leading-none">{title}</small>
      <div className="flex items-center space-x-2">
        <Input
          className="max-w-20"
          type="number"
          value={data?.size}
          onChange={(e) => onConfig(keyName, "size", e.target.value)}
        />
        <ToggleGroup
          type="single"
          value={data?.boldness}
          onValueChange={(value) => onConfig(keyName, "boldness", value)}
        >
          <ToggleGroupItem value="normal">B</ToggleGroupItem>
          <ToggleGroupItem value="bold">B</ToggleGroupItem>
        </ToggleGroup>
        <Input
          className="max-w-20"
          type="number"
          value={data?.line}
          onChange={(e) => onConfig(keyName, "line", e.target.value)}
        />
        <ToggleGroup
          type="single"
          value={data?.alignment}
          onValueChange={(value) => onConfig(keyName, "alignment", value)}
        >
          <ToggleGroupItem value="start">
            <TextAlignLeftIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="center">
            <TextAlignCenterIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="end">
            <TextAlignRightIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default Editor;
