use std::{thread, time::Duration};

use console::style;

fn main() -> std::io::Result<()> {
    // Set a no-op Ctrl-C handler so that Ctrl-C results in
    // `Esc` behavior because of a `term.read_key()` error
    // instead of terminating the process. You can skip
    // this step if you have your own Ctrl-C handler already set up.
    //
    // We cannot (easily) handle this at the library level due to
    // https://github.com/Detegr/rust-ctrlc/issues/106#issuecomment-1887793468.
    // ctrlc::set_handler(move || {}).expect("setting Ctrl-C handler");

    cliclack::clear_screen()?;

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
