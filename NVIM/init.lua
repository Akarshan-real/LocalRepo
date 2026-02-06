vim.cmd("set tabstop=2")
vim.cmd("set softtabstop=0")
vim.cmd("set shiftwidth=2")
vim.g.mapleader = " "

local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"

if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    "git",
    "clone",
    "--filter=blob:none",
    "https://github.com/folke/lazy.nvim.git",
    "--branch=stable", -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

local plugins = {
  {
    "projekt0n/github-nvim-theme",
    name = "github-theme",
    lazy = false,      -- load during startup
    priority = 1000,   -- load before other plugins
    config = function()
      require("github-theme").setup({
        options = {
          compile_path = vim.fn.stdpath("cache") .. "/github-theme",
          compile_file_suffix = "_compiled",
      },
    })
    
    vim.cmd("colorscheme github_dark")
    end,
  },
  {
	  'nvim-telescope/telescope.nvim',
	  dependencies = { 'nvim-lua/plenary.nvim' },
    config = function()
      local builtin = require("telescope.builtin")
      vim.keymap.set('n','<leader>fg',builtin.live_grep,{})
      vim.keymap.set('n','<C-p>',builtin.find_files,{})
    end,
  },
}

local opts = {}

require("lazy").setup(plugins, opts)


