import type { ButtonProps as ChakraButtonProps } from "@chakra-ui/react"
import {
  AbsoluteCenter,
  Button as ChakraButton,
  Span,
  Spinner
} from "@chakra-ui/react"
import * as React from "react"

interface ButtonLoadingProps {
  loading?: boolean
  loadingText?: React.ReactNode
}

export interface ButtonProps extends ChakraButtonProps, ButtonLoadingProps { }

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const { loading, disabled, loadingText, children, ...rest } = props

    rest.variant = rest.variant || "solid"

    switch (rest.variant) {
      case "solid":
        // bg={"bg.emphasized"} color={"fg"}
        rest.bg = "bg.emphasized"
        rest.color = "fg"
        rest._hover = { bg: "bg.emphasized/75" }
    }

    return (
      <ChakraButton padding={"4"} fontWeight={"semibold"} disabled={loading || disabled} ref={ref} {...rest}>
        {loading && !loadingText ? (
          <>
            <AbsoluteCenter display="inline-flex">
              <Spinner size="inherit" color="inherit" />
            </AbsoluteCenter>
            <Span opacity={0}>{children}</Span>
          </>
        ) : loading && loadingText ? (
          <>
            <Spinner size="inherit" color="inherit" />
            {loadingText}
          </>
        ) : (
          children
        )}
      </ChakraButton>
    )
  },
)