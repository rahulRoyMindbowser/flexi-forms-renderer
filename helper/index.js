import Panel from '../components/common/Panel';
import * as yup from 'yup';
import BooleanInput from '../components/forms/BooleanInput';
import DateInput from '../components/forms/DateInput';
import InputField from '../components/forms/InputField';
import SelectField from '../components/forms/Select';
import CheckBox from '../components/forms/CheckBox';
import RadioGroup from '../components/forms/RadioGroup';
import FileUpload from '../components/forms/FileUpload';
import Textarea from '../components/forms/TextArea';
import Matrix from '../components/forms/Matrix';

export const VisibleIfRegex = /\{([^}]+)\}\s*=\s*'([^']+)'/;

export const spanMap = value => {
  switch (value) {
    case '1/12': {
      return 'calc(100%/12 - 1px)';
    }
    case '2/12': {
      return 'calc(100%/6 - 2px)';
    }
    case '3/12': {
      return 'calc(100%/4 - 3px)';
    }
    case '4/12': {
      return 'calc((100%/3) - 8px)';
    }
    case '5/12': {
      return 'calc(500%/12 - 5px)';
    }
    case '6/12': {
      return 'calc(100%/2 - 6px)';
    }
    case '7/12': {
      return 'calc(700%/12 - 7px)';
    }
    case '8/12': {
      return 'calc(200%/3 - 8px)';
    }
    case '9/12': {
      return 'calc(300%/4 - 9px)';
    }
    case '10/12': {
      return 'calc(500%/6 - 10px)';
    }
    case '11/12': {
      return 'calc(1100%/12 - 11px)';
    }
    default: {
      return '100%';
    }
  }
};

export const renderElement = element => {
  switch (element.type) {
    case 'panel':
      return <Panel element={element} />;
    case 'text':
    case 'number':
      return (
        <InputField
          id={element.name}
          type={element.type}
          required={element.isRequired}
          maxLength={element.maxLength}
          placeholder={element.placeholder}
          name={element.name}
          label={element.title}
          span={element.span}
          visibleIf={element.visibleIf}
        />
      );
    case 'textarea':
      return (
        <Textarea
          id={element.name}
          type={element.type}
          required={element.isRequired}
          maxLength={element.maxLength}
          placeholder={element.placeholder}
          name={element.name}
          label={element.title}
          span={element.span}
          visibleIf={element.visibleIf}
        />
      );
    case 'checkbox':
      return (
        <CheckBox
          id={element.name}
          options={element.choices}
          required={element.isRequired}
          placeholder={element.placeholder}
          name={element.name}
          label={element.title}
          span={element.span}
          showNoneItem={element.showNoneItem}
          showOtherItem={element.showOtherItem}
          noneText={element.noneText}
          otherText={element.otherText}
          visibleIf={element.visibleIf}
        />
      );
    case 'radiogroup':
      return (
        <RadioGroup
          id={element.name}
          options={element.choices}
          required={element.isRequired}
          placeholder={element.placeholder}
          name={element.name}
          label={element.title}
          span={element.span}
          visibleIf={element.visibleIf}
        />
      );
    case 'boolean':
      return (
        <BooleanInput
          id={element.name}
          type="date"
          required={element.isRequired}
          placeholder={element.placeholder}
          name={element.name}
          label={element.title}
          labelPosition={element.labelPosition}
          span={element.span}
          visibleIf={element.visibleIf}
        />
      );
    case 'date':
      return (
        <DateInput
          id={element.name}
          type="date"
          required={element.isRequired}
          placeholder={element.placeholder}
          name={element.name}
          label={element.title}
          span={element.span}
          visibleIf={element.visibleIf}
        />
      );
    case 'file':
      return (
        <FileUpload
          id={element.name}
          // type="select"
          required={element.isRequired}
          placeholder={element.placeholder}
          name={element.name}
          label={element.title}
          span={element.span}
          maxFiles={1}
          // visibleIf={element.visibleIf}
        />
      );
    case 'dropdown':
      return (
        <SelectField
          id={element.name}
          type="select"
          required={element.isRequired}
          placeholder={element.placeholder}
          name={element.name}
          label={element.title}
          span={element.span}
          options={element.choices}
          visibleIf={element.visibleIf}
        />
      );

    case 'matrix':
      return (
        <Matrix
          id={element.type}
          type={element.type}
          columns={element.columns}
          rows={element.rows}
          label={element.title}
          isAllRowRequired={element.isAllRowRequired}
          name={element.name}
        />
      );

    default:
      return null;
  }
};

export const buildValidationSchema = data => {
  const schema = {};

  const createSchema = datum =>
    datum?.forEach(element => {
      switch (element?.type) {
        case 'panel': {
          if (element.elements && element.elements.length > 0) createSchema(element?.elements);
          break;
        }
        case 'text':
        case 'number':
        case 'boolean':
        case 'date':
        case 'radiogroup':
        case 'dropdown':
          schema[element.name] = yup.string();
          break;
        case 'checkbox':
          schema[element.name] = yup.array().of(yup.string());
          break;
        case 'file':
          schema[element.name] = yup.mixed();
          break;
        default:
          break;
      }
      if (element.isRequired) {
        schema[element.name] = schema[element.name].required(
          `${element.title ?? element.name} is required.`,
        );
      }
      if (element.validators) {
        element.validators.forEach(validator => {
          if (validator.type === 'regex') {
            schema[element.name] = schema[element.name].matches(
              new RegExp(validator.regex),
              validator.text,
            );
          }
        });
      }
    });

  createSchema(data?.elements);

  return yup.object().shape(schema);
};
