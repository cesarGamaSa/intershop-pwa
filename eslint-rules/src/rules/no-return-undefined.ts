import {
  AST_NODE_TYPES,
  TSESLint,
} from '@typescript-eslint/experimental-utils';
import {
  RuleContext,
  RuleListener,
} from '@typescript-eslint/experimental-utils/dist/ts-eslint';

export const noReturnUndefinedRule: {
  meta: TSESLint.RuleMetaData<'undefinedError'>;
  create: (
    context: RuleContext<'undefinedError', []>,
    optionsWithDefault: []
  ) => RuleListener;
} = {
  meta: {
    messages: {
      undefinedError: `Don't return undefined explicitly. Use an empty return instead.`,
    },
    fixable: 'code',
    type: 'problem',
    schema: [],
  },
  create: (context) => ({
    ReturnStatement(node) {
      if (
        node.argument?.type === AST_NODE_TYPES.Identifier &&
        node.argument.name === 'undefined'
      ) {
        context.report({
          node,
          messageId: 'undefinedError',
          fix: (fixer) => {
            return fixer.remove(node.argument);
          },
        });
      }
    },
  }),
};
