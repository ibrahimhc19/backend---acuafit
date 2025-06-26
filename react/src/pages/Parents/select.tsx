import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface SelectOption<T> {
  label: string;
  value: T;
}

interface PageSizeSelectProps<T> {
  value: T;
  options: SelectOption<T>[];
  onValueChange: (value: T) => void;
}


export function SelectRows<T extends string | number>({
  value,
  options,
  onValueChange,
}: PageSizeSelectProps<T>) {
  return (
    <Select value={String(value)} onValueChange={(val) => onValueChange(val as T)}>
      <SelectTrigger>
        <SelectValue placeholder={String(value)} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((opt) => (
            <SelectItem key={String(opt.value)} value={String(opt.value)}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}