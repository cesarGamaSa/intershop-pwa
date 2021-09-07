import { noReturnUndefinedRule } from './rules/no-return-undefined';
import { noAssignmentToInputsRule } from './rules/no-assignment-to-inputs';

const rules = {
  'no-return-undefined': noReturnUndefinedRule,
  'no-assignment-to-inputs': noAssignmentToInputsRule,
};

module.exports = {
  rules,
};
