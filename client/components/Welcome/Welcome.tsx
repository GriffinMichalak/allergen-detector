import classes from "./Welcome.module.scss";
import { Button, Container, Group, Text } from "@mantine/core";

export function Welcome() {
  return (
    <div className={classes.wrapper}>
      <Container className={classes.inner}>
        <h1 className={classes.title}>
          Scan and find{"  "}
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            any food item
          </Text>
          <br />
          on the go
        </h1>

        <Text className={classes.description} c="dimmed">
          With our app, you can easily scan barcodes and find food items on the
          go to identify allergens, ingredients, and nutritional information so
          you will make informed decisions about what to eat.
        </Text>

        <Group className={classes.controls}>
          <Button
            component="a"
            href="/resume"
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
          >
            Resume
          </Button>

          <Button
            component="a"
            href="/about"
            size="xl"
            variant="default"
            className={classes.control}
          >
            About Me
          </Button>
        </Group>
      </Container>
    </div>
  );
}
