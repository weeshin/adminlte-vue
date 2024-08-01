export interface ColumnProps {
  header: string,
  field: string,
  headerBold?: boolean, 
  textAlign?: string,
  sortable?: boolean,
  __thClass?: string,
  headerStyle?: string,
  colsMap?: Record<string, ColumnProps>,
  sort?: (col: ColumnProps) => void
}


export interface FormFieldProps {
  field: string,
  label: string,
  type: string
}

export interface FormGroupProps {
  groupName: string,
  fields: FormFieldProps[]
}