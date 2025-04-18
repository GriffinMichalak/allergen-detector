import Link from "next/link";
import classes from "./Navbar.module.scss";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconMoonStars,
  IconSun,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Box,
  Burger,
  Drawer,
  Group,
  Switch,
  Text,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function Navbar() {
  // const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const handleLinkClick = () => {
    closeDrawer();
  };

  return (
    <Box>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Link href="/" style={{ textDecoration: "none" }}>
            <Text
              fw={700}
              size="xl"
              style={{
                color: colorScheme === "dark" ? "white" : "black",
              }}
            >
              Allergen Detector
            </Text>
          </Link>

          {/* Desktop Navigation */}
          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href="/" className={classes.link}>
              Home
            </Link>
            <Link href="/about" className={classes.link}>
              About Me
            </Link>
            <Link href="/resume" className={classes.link}>
              Resume
            </Link>
          </Group>

          {/* Desktop Links and Social Icons */}
          <Group visibleFrom="sm">
            <Tooltip label="GitHub" position="bottom" withArrow>
              <Link
                href="https://github.com/GriffinMichalak"
                passHref
                target="_blank"
              >
                <ActionIcon variant="default" aria-label="GitHub">
                  <IconBrandGithub size={16} />
                </ActionIcon>
              </Link>
            </Tooltip>
            <Tooltip label="LinkedIn" position="bottom" withArrow>
              <Link
                href="https://www.linkedin.com/in/griffinmichalak/"
                passHref
                target="_blank"
              >
                <ActionIcon variant="default" aria-label="LinkedIn">
                  <IconBrandLinkedin size={16} />
                </ActionIcon>
              </Link>
            </Tooltip>
            <Tooltip label="Email Me!" position="bottom" withArrow>
              <Link
                href="mailto:griffinmichalak@gmail.com"
                passHref
                target="_blank"
              >
                <ActionIcon variant="default" aria-label="Email">
                  <IconMail size={16} />
                </ActionIcon>
              </Link>
            </Tooltip>

            <Switch
              defaultChecked
              size="md"
              color="dark.4"
              onLabel={
                <IconSun
                  size={16}
                  stroke={2.5}
                  color="var(--mantine-color-yellow-4)"
                />
              }
              offLabel={
                <IconMoonStars
                  size={16}
                  stroke={2.5}
                  color="var(--mantine-color-blue-6)"
                />
              }
              onClick={toggleColorScheme}
            />
          </Group>

          {/* Mobile Menu (Burger) */}
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <Group>
          <Link href="/" className={classes.link} onClick={handleLinkClick}>
            Home
          </Link>
          <Link
            href="/about"
            className={classes.link}
            onClick={handleLinkClick}
          >
            About Me
          </Link>
          <Link
            href="/resume"
            className={classes.link}
            onClick={handleLinkClick}
          >
            Resume
          </Link>
        </Group>

        {/* Social Links in Mobile Menu */}
        <Group mt="md">
          <Tooltip label="GitHub" position="bottom" withArrow>
            <Link
              href="https://github.com/GriffinMichalak"
              passHref
              target="_blank"
            >
              <ActionIcon variant="default" aria-label="GitHub">
                <IconBrandGithub size={16} />
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip label="LinkedIn" position="bottom" withArrow>
            <Link
              href="https://www.linkedin.com/in/griffinmichalak/"
              passHref
              target="_blank"
            >
              <ActionIcon variant="default" aria-label="LinkedIn">
                <IconBrandLinkedin size={16} />
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip label="Email Me!" position="bottom" withArrow>
            <Link
              href="mailto:griffinmichalak@gmail.com"
              passHref
              target="_blank"
            >
              <ActionIcon variant="default" aria-label="Email">
                <IconMail size={16} />
              </ActionIcon>
            </Link>
          </Tooltip>
          <Switch
            defaultChecked
            size="md"
            color="dark.4"
            onLabel={
              <IconSun
                size={16}
                stroke={2.5}
                color="var(--mantine-color-yellow-4)"
              />
            }
            offLabel={
              <IconMoonStars
                size={16}
                stroke={2.5}
                color="var(--mantine-color-blue-6)"
              />
            }
            onClick={toggleColorScheme}
          />
        </Group>
      </Drawer>
    </Box>
  );
}
