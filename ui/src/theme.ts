import { createTheme } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'orange',

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },

  components: {
    Flex: {
      defaultProps: {
        gap: 'sm',
      },
    },

    Box: {
      defaultProps: {
        p: 'md',
        m: 0,
      },
    },

    Stack: {
      defaultProps: {
        gap: 'md',
      },
    },

    Group: {
      defaultProps: {
        gap: 'md',
      },
    },

    Grid: {
      defaultProps: {
        gutter: 'md',
      },
    },

    Paper: {
      defaultProps: {
        p: 'md',
        radius: 'md',
      },
    },

    Card: {
      defaultProps: {
        padding: 'md',
        radius: 'md',
      },
    },

    TextInput: {
      defaultProps: {
        size: 'xs',
      },
    },

    Button: {
      defaultProps: {
        size: 'xs',
      },
    },

    Table: {
      defaultProps: {
        fz: 'xs',
      },
    },
  },
});
