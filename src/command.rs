use console::style;
use std::{thread, time::Duration};

use crate::services::{add_services, Service};

pub fn run_main() -> crate::errors::Result<()> {
    let cli_name = String::from("komp");
    cliclack::intro(style(format!("  {}  ", cli_name)).on_yellow().black())?;

    let services_selected = cliclack::multiselect("Which service do you want to add ? 🤔")
        .item(Service::Postgres, "PostgreSQL", "")
        .item(Service::MySQL, "MySQL", "")
        .item(Service::Mailpit, "Mailpit", "")
        .required(true)
        .interact()?;

    let spinner = cliclack::spinner();
    spinner.start("Adding services to your Docker Compose file");
    add_services(services_selected.clone())?;
    thread::sleep(Duration::from_millis(1));
    spinner.stop("Services applied 👌");

    cliclack::note(
        "Summary 📜",
        style(
            services_selected
                .iter()
                .map(|s| s.to_string())
                .collect::<Vec<_>>()
                .join("\n"),
        )
        .yellow(),
    )?;

    cliclack::outro("Done 🐳")?;

    Ok(())
}
