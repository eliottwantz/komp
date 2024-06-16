use console::style;
use std::{thread, time::Duration};

pub fn run_main() -> std::io::Result<()> {
    let cli_name = String::from("komp");
    cliclack::intro(style(format!("  {}  ", cli_name)).on_yellow().black())?;

    let services_selected = cliclack::multiselect("Which service do you want to add ? 🤔")
        .item("postgres", "PostgreSQL", "")
        .item("mysql", "MySQL", "")
        .item("mailpit", "Mailpit", "")
        .required(true)
        .interact()?;

    let spinner = cliclack::spinner();
    spinner.start("Adding services to your Docker Compose file");
    thread::sleep(Duration::from_secs(1));
    spinner.stop("Services applied 👌");

    cliclack::note("Summary 📜", style(services_selected.join("\n")).yellow())?;

    cliclack::outro("Done 🐳")?;

    Ok(())
}
