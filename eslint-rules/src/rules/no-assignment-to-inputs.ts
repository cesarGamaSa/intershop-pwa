import { AST_NODE_TYPES, TSESLint, TSESTree } from '@typescript-eslint/experimental-utils';
import { RuleContext, RuleListener } from '@typescript-eslint/experimental-utils/dist/ts-eslint';

export const noAssignmentToInputsRule: {
  meta: TSESLint.RuleMetaData<'inputAssignmentError'>;
  create: (context: RuleContext<'inputAssignmentError', []>, optionsWithDefault: []) => RuleListener;
} = {
  meta: {
    messages: {
      inputAssignmentError: `Assigning to @Input decorated properties is forbidden.`,
    },
    type: 'problem',
    schema: [],
  },
  create: context => {
    const inputs: string[] = [];

    /**
     * checks whether a ClassProperty is decorated with the @Input() decorator
     */
    function checkIsInput(node: TSESTree.ClassProperty): boolean {
      const decorators = node.decorators;
      if (!decorators || !decorators.length) {
        return false;
      }
      if (decorators[0].expression.type === AST_NODE_TYPES.CallExpression) {
        const callExpression = decorators[0].expression;
        const name = callExpression.callee.type === AST_NODE_TYPES.Identifier ? callExpression.callee.name : '';
        return name === 'Input';
      }
      return false;
    }

    return {
      ClassProperty(node): void {
        if (checkIsInput(node)) {
          inputs.push(node.key.type === AST_NODE_TYPES.Identifier ? node.key.name : '');
        }
      },
      AssignmentExpression(node) {
        if (
          node.left.type === AST_NODE_TYPES.MemberExpression &&
          node.left.object.type === AST_NODE_TYPES.ThisExpression &&
          node.left.property.type === AST_NODE_TYPES.Identifier &&
          inputs.includes(node.left.property.name)
        ) {
          context.report({
            node,
            messageId: 'inputAssignmentError',
          });
        }
      },
    };
  },
};
